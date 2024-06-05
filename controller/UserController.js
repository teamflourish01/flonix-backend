const { UserModel } = require("../model/UserModel");

exports.addUser = async (req, res) => {
  
  console.log(req.file, "user");
  let dup=JSON.parse(req.body.dup)
  if(req.file){
    dup.image=req.file.filename
  }
  console.log(dup,"dup");
  try {
    let exist = await UserModel.findOne({ name:dup.name });
    if (exist) {
      res.status(200).send({
        exist,
        msg: "User already exists",
      });
    } else {
      let data = await UserModel({...dup});
      await data.save();
      res.status(200).send({
        data,
        msg: "User saved successfully",
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
  try {
    let data = await UserModel.find();
    res.status(200).send({
      data,
      msg: "User found successfully",
    });
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
  try {
    let data = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
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
    let data = await UserModel.find(
        {
      name: { $regex: `^${search}`, $options: `i` },
    }
);
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
