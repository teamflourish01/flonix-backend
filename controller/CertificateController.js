const CertificateModel = require("../model/CertificateModel");

exports.getAllCertificate = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await CertificateModel.find()
        .skip((page - 1) * 12)
        .limit(12);

      res.status(200).send({ msg: "Certificate get successfuly", data });
    } else {
      let data = await CertificateModel.find();
      res.status(200).send({ msg: "Certificate recived successfuly", data });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addCertificate = async (req, res) => {
  try {
    const { imgdescription } = req.body;
    const certiImage = req.file.filename;

    const newCertificate = new CertificateModel({
      imgdescription,
      image: certiImage,
    });
    await newCertificate.save();
    res
      .status(200)
      .json({ msg: "certificate add successfuly", newCertificate });
  } catch (error) {
    res.status(400).json({ error: "Certificate Not Add", error });
  }
};

exports.getCertificateById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await CertificateModel.findById(id);
    res.status(200).send({ msg: "Single certificate received", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteCertificate = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await CertificateModel.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Certificate deleted successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { imgdescription } = req.body;
    let singleImage;
    if (req.file) {
      singleImage = req.file.filename;
      req.body.image = singleImage;
    }

    const existingCertificate = await CertificateModel.findById(id);
    if (!existingCertificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    const certificateData = await CertificateModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!certificateData) {
      return res.status(404).json({ error: "Failed to update certificate" });
    }
    res.status(200).json({
      msg: "Data Updated successfuly",
      certificateData,
    });
  } catch (error) {
    res.status(400).json({ error: "Internal server error", error });
  }
};
