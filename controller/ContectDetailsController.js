const ContectdetailsModel = require("../model/ContectDetailsModel");

exports.getContectDetails = async (req, res) => {
  try {
    let data = await ContectdetailsModel.find();
    res.status(200).json({ msg: "Contect Details get suucessfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addContectdetail = async (req, res) => {
  try {
    const contectDetails = new ContectdetailsModel(req.body);
    const data = await contectDetails.save();
    res.status(200).json({ msg: "contect-Details Add successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "contect-Details Not Add", error });
  }
};

exports.getContectdetailsByid = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ContectdetailsModel.findById(id);
    res.status(200).send({ msg: "Single contect-Details received", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
exports.updateContectdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateContect } = req.body;

    const exist = await ContectdetailsModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "Contect-details not found" });
    }
    const data = await ContectdetailsModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Update Successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "contect-Details Update Faild", error });
  }
};
