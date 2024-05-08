const NewsHeadingModel = require("../model/NewsHeadingModel");

exports.getNewsHeading = async (req, res) => {
  try {
    let data = await NewsHeadingModel.find();
    res.status(200).json({ msg: "Heading- Details get suucessfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addNewsHeading = async (req, res) => {
  try {
    const NewsHeading = new NewsHeadingModel(req.body);
    const data = await NewsHeading.save();
    res.status(200).json({ msg: "Heading-Details Add successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "Heading-Details Not Add", error });
  }
};

exports.getNewsHeadingById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await NewsHeadingModel.findById(id);
    res.status(200).send({ msg: "Single Heading-Details received", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteNewsHeading=async(req,res)=>{
  let{id}=req.params
  try {
    let data=await NewsHeadingModel.findByIdAndDelete(id);
    res.status(200).json({msg:"News heading Delete successfuly",data})
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
}

exports.updateNewsHeading = async (req, res) => {
  const { id } = req.params;
  try {
    const { updaeHeading } = req.body;
    const data = await NewsHeadingModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Update Successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "NewsHeading-Details Update Faild", error });
  }
};
