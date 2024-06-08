const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  console.log(req.file, "user");
  let dup = JSON.parse(req.body.dup);
  if (req.file) {
    dup.image = req.file.filename;
  }
  console.log(dup, "dup");
  try {
    let exist = await UserModel.findOne({ name: dup.name });
    if (exist) {
      res.status(200).send({
        exist,
        msg: "User already exists",
      });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(dup.password, saltRounds);
      dup.password = hashedPassword;

      let data = await UserModel({ ...dup });
      await data.save();
      res.status(200).send({
        data,
        msg: "User saved successfully",
        token: await data.genrateToken(),
        userId: data._id.toString(),
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await UserModel.find()
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({
        data,
        msg: "User found with pageination successfully",
      });
    } else {
      let data = await UserModel.find();
      res.status(200).send({
        data,
        msg: "User found successfully",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.getUserDetail = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await UserModel.findById(id);
    res.status(200).send({
      data,
      msg: "User Details Retrived Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  let { id } = req.params;
  let profileImg;
  if (req.file) {
    profileImg = req.file.filename;
    req.body.image = profileImg;
  }
  // hased password update section
  if (req.body.password) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // user update section
  const exist = await UserModel.findById(id);
  if (!exist) {
    return res.status(404).json({ error: "User Not Found" });
  }
  try {
    let data = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ error: "Faild to User Update" });
    }
    res.status(200).send({
      data,
      msg: "User Details Updated Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await UserModel.findByIdAndDelete(id);
    res.status(200).send({
      data,
      msg: "User Removed Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.searchUser = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await UserModel.find({
      name: { $regex: `^${search}`, $options: `i` },
    });
    res.status(200).send({
      data,
      msg: "User Found Successfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      return res
        .status(401)
        .json({ msg: "User does not exist, please SIGN-UP" });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (isMatch) {
      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: await isUser.genrateToken(),
          userId: isUser._id.toString(),
        });
    } else {
      res.status(401).json({ msg: "Invalid password" });
    }
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};
