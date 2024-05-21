const AboutusModel = require("../model/AboutusModel");

exports.getAboutus = async (req, res) => {
  try {
    let data = await AboutusModel.find({});
    res.status(200).send({ msg: "Aboutus data get successfuly", data });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      error,
    });
  }
};

exports.addAboutus = async (req, res) => {
  try {
    const {
      heading,
      description,
      bannerheading,
      bannerdescription,
      mission,
      vision,
      goals,
    } = req.body;
    const bannerImage = req.files["banner"][0].filename; // Path of the uploaded banner image
    const logoFiles = req.files["logoimages"];
    console.log(req.files["logoimages"]);
    const logoImages = logoFiles ? logoFiles.map((file) => file.filename) : [];

    const newAboutus = new AboutusModel({
      heading,
      description,
      banner: bannerImage,
      bannerheading,
      bannerdescription,
      logoimages: logoImages,
      mission,
      vision,
      goals,
    });

    await newAboutus.save();
    res.status(201).json({ message: "Data added successfully", newAboutus });
  } catch (err) {
    res.status(400).json({ error: "Internal server error", err });
  }
};

// fetch by Id

exports.getAboutusById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AboutusModel.findById(id);
    res.status(200).json({ msg: "about us data fetched", data });
  } catch (error) {
    res.status(400).json({ msg: error.message, error });
  }
};

// Update Logic

// exports.updateAboutus = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const {
//       heading,
//       description,
//       bannerheading,
//       bannerdescription,
//       logoimages,
//       mission,
//       vision,
//       goals,
//     } = req.body;
//     let singleImage;
//     let logoImages;
//     if (req.files.banner) {
//       singleImage = req.files.banner;
//       req.body.banner = singleImage[0].filename;
//     }
//     if (req.files && req.files.logoimages) {
//       logoImages = req.files.logoimages;
//       req.body.logoimages = logoImages.map((image) => image.filename);
//     }

//     const existingAbouts = await AboutusModel.findById(id);
//     existingLogoImages = existingAbouts.logoimages || [];

//     const allLogoImages = [
//       ...existingLogoImages,
//       ...(req.body.logoimages || []),
//     ];

//     const aboutus = await AboutusModel.findByIdAndUpdate(
//       id,
//       { ...req.body, logoimages: allLogoImages },
//       { new: true }
//     );
//     res.status(200).json({
//       msg: "Data Updated successfuly",
//       aboutus,
//     });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.updateAboutus = async (req, res) => {
  let { id } = req.params;
  try {
    let dup = JSON.parse(req.body.dup);
    let files = req.files;
    let logoIMG = files["logoimages"]?.map((e) => e.filename);

    if (logoIMG) {
      dup.logoimages = [...dup.logoimages, ...logoIMG];
    }
    // Banner Image
    if (files.banner) {
      const bnrIMG = files.banner[0].filename;
      dup.banner = bnrIMG;
    }

    let data = await AboutusModel.findByIdAndUpdate(
      id,
      { ...dup },
      { new: true }
    );
    res.status(200).send({ msg: "About us Data Update Successfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

// in-Edit delete Logo Img
exports.deleteLogoImg = async (req, res) => {
  const { id, index } = req.params;
  try {
    const doc = await AboutusModel.findById(id);

    if (!doc) {
      return res.status(404).json({ error: "Logo img is not found " });
    }

    doc.logoimages.splice(index, 1);
    await doc.save();

    res.status(200).json({ msg: "Logo Delete Succefuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};
