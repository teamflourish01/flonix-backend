const EbrochureModel = require("../model/EbrochureModel");

exports.getAlleBrochure = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await EbrochureModel.find()
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({ msg: "E-Brochure get successfuly", data });
    } else {
      let data = await EbrochureModel.find();
      res.status(200).send({ msg: "E-brochure recived successfuly", data });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addEbrochure = async (req, res) => {
  try {
    const { filename } = req.body;
    const docFile = req.file.filename;

    const newEbrochure = new EbrochureModel({
      filename,
      doc: docFile,
    });
    await newEbrochure.save();
    res.status(200).json({ msg: "E-Brochure add successfuly", newEbrochure });
  } catch (error) {
    res.status(400).json({ error: "E-brochure Not Add", error });
  }
};

exports.getEbrouserById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await EbrochureModel.findById(id);
    res.status(200).send({ msg: "Single E-Brochure received", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteBrochure = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await EbrochureModel.findByIdAndDelete(id);
    res.status(200).send({
      msg: "E-Brochure deleted successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.updateEbrochure = async (req, res) => {
  try {
    const { id } = req.params;
    let docFile;
    if (req.file) {
      docFile = req.file.filename;
      req.body.doc = docFile;
    }
    const exist = await EbrochureModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "E-Brochure not found" });
    }
    const data = await EbrochureModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ error: "Failed to update E-Brochure" });
    }
    res.status(200).json({
      msg: "Data Updated successfuly",
      data,
    });
  } catch (error) {
    res.status(400).json({ error: "Internal server error", error });
  }
};
