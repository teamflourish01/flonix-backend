const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  // console.log(req.file, "user");
  let dup = JSON.parse(req.body.dup);
  if (req.file) {
    dup.image = req.file.filename;
  }
  // console.log(dup, "dup");
  try {
    let existName = await UserModel.findOne({ name: dup.name });
    let existEmail = await UserModel.findOne({ email: dup.email });

    if (existName || existEmail) {
      let msg = "";
      if (existName) msg += `${existName.name} is alredy exist`;
      if (existName && existEmail) msg += " and ";
      if (existEmail) msg += `${existEmail.email} is alredy exist`;
      res.status(200).send({
        exist: existName || existEmail,
        msg: msg,
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
  const { id } = req.params;
  let profileImg;

  if (req.file) {
    profileImg = req.file.filename;
    req.body.image = profileImg;
  }

  try {
    // check user exists
    const exist = await UserModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // Hash password if provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update user data
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Failed to update user" });
    }

    res.status(200).json({
      data: updatedUser,
      msg: "User Details Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
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
      res.status(200).json({
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
