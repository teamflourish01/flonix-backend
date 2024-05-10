const AboutFlonixModel = require("../model/AboutFlonixModel");

exports.getAboutFlonix = async (req, res) => {
  try {
    const data = await AboutFlonixModel.find({});
    res.status(200).json({ msg: "About-flonix data get successfully", data });
  } catch (error) {
    res.status(500).json({ msg: error.message, error });
  }
};

exports.addAboutFlonix = async (req, res) => {
  try {
    const data = AboutFlonixModel(req.body);
    await data.save();
    res.status(200).json({ msg: "About Flonix  successfuly added", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.getAboutFlonixById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AboutFlonixModel.findById(id);
    res.status(200).json({ msg: "About Flonix Single Data get", data });
  } catch (error) {
    res.status(500).json({ msg: error.message, error });
  }
};

exports.updateAboutFlonix = async (req, res) => {
  try {
    const { id } = req.params;
    const exist = await AboutFlonixModel.findById(id);
    if (!exist) {
      res.status(404).json({ error: "About Flonix details not found" });
    }
    const data = await AboutFlonixModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ msg: "About-Flonix Update successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "contect-Details Update Faild", error });
  }
};
