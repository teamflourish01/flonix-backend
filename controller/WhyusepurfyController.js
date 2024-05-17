const WhyusepurfyModel = require("../model/HomeWhyuseModel");

exports.getAllpurify = async (req, res) => {
  try {
    let data = await WhyusepurfyModel.find({});
    res.status(200).json({ msg: "purify section get successfuly", data });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

exports.addPurify = async (req, res) => {
  try {
    const {
      main_heading,
      left_heading1,
      left_heading2,
      left_text1,
      left_text2,
      right_heading1,
      right_heading2,
      right_text1,
      right_text2,
      bottom_heading1,
      bottom_heading2,
      bottom_heading3,
      bottom_heading4,
      bottom_text1,
      bottom_text2,
      bottom_text3,
      bottom_text4,
    } = req.body;

    const firstImg = req.files.first_image[0].filename;
    const seconedImg = req.files.seconed_image[0].filename;

    const newData = new WhyusepurfyModel({
      main_heading,
      left_heading1,
      left_heading2,
      left_text1,
      left_text2,
      right_heading1,
      right_heading2,
      right_text1,
      right_text2,
      bottom_heading1,
      bottom_heading2,
      bottom_heading3,
      bottom_heading4,
      bottom_text1,
      bottom_text2,
      bottom_text3,
      bottom_text4,
      first_image: firstImg,
      seconed_image: seconedImg,
    });

    await newData.save();
    res
      .status(200)
      .json({ msg: "purify section add successfuly", data: newData });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "purify section Not Add", error: error.message });
  }
};

// exports.addPurify = async (req, res) => {
//   let dup = JSON.parse(req.body.dup);
//   if (req.files.first) {
//     dup.first_image = req.files.first[0].filename;
//   }
//   if (req.files.second) {
//     dup.seconed_image = req.files.second[0].filename;
//   }
//   try {
//     let data = await WhyusepurfyModel({ ...dup });
//     await data.save();
//     res.status(200).json({ msg: "Ro Benifits add successfuly", data });
//   } catch (error) {
//     res.status(404).json({ msg: error.message, error });
//   }
// };

exports.getPurifyById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await WhyusepurfyModel.findById(id);
    res.status(200).json({ msg: "Single purify item recived", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.updatePurify = async (req, res) => {
  const { id } = req.params;
  try {
    let dup = JSON.parse(req.body.dup);
    let files = req.files;

    if (files.first_image) {
      const firstimg = files.first_image[0].filename;
      dup.first_image = firstimg;
    }

    if (files.seconed_image) {
      const secndimg = files.seconed_image[0].filename;
      dup.seconed_image = secndimg;
    }

    const data = await WhyusepurfyModel.findByIdAndUpdate(
      id,
      { ...dup },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ msg: "Faild to update purify" });
    }
    res.status(200).json({ msg: "Data Update successfuly", data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};
