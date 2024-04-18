const { HomeModel } = require("../model/HomeModel");

exports.getHome = async (req, res) => {
  try {
    let data = await HomeModel.find();
    res.status(200).send({
      msg: "Data Received",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't find Home",
      error,
    });
  }
};

exports.addHome = async (req, res) => {
  try {
    let data = await HomeModel(req.body);
    await data.save();
    res.status(200).send({
      msg: "Data Added",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Add Home",
      error,
    });
  }
};

exports.editHome = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await HomeModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({
      msg: "Home Page Edited successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: "Couldn't Edit Home",
      error,
    });
  }
};
