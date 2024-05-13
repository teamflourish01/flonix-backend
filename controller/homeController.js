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

exports.getHomeSingle = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await HomeModel.findById(id);
    res.status(200).json({ msg: "Single Home item get", data });
  } catch (error) {
    res.status(400).json({
      msg: "Couldn't Get Single Home",
      error,
    });
  }
};

exports.deleteImages = async (req, res) => {
  const { id, index } = req.params;
  try {
    const doc = await HomeModel.findById(id);

    if (!doc) {
      return res.status(404).json({ error: "Imges is Not Found" });
    }
    doc.banner_images.splice(index, 1);

    if (index < doc.trust_factor_images.length) {
      doc.trust_factor_images.splice(index, 1);
    }

    await doc.save();
    res.status(200).json({ msg: "DB Images delete successfuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// exports.editHome = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const {
//       banner_heading,
//       about_heading,
//       about_pera,
//       about_points,
//       about_video,
//       top_product,
//       trust_factor_text,
//       our_products,
//       our_distributor_text,
//       our_blogs,
//     } = req.body;

//     let updateObject = {
//       banner_heading,
//       about_heading,
//       about_pera,
//       about_points,
//       about_video,
//       top_product,
//       trust_factor_text,
//       our_products,
//       our_distributor_text,
//       our_blogs,
//     };

//     if (req.files) {
//       if (req.files.banner_images) {
//         // concate existing images and new images
//         const existingBannerImages =
//           (await HomeModel.findById(id)).banner_images || [];
//         updateObject.banner_images = existingBannerImages.concat(
//           req.files.banner_images.map((image) => image.filename)
//         );
//       }

//       if (req.files.our_distributor_logo) {
//         const existingDistributorImages =
//           (await HomeModel.findById(id)).our_distributor_logo || [];
//         updateObject.our_distributor_logo = existingDistributorImages.concat(
//           req.files.our_distributor_logo.map((image) => image.filename)
//         );
//       }

//       if (req.files.trust_factor_images) {
//         const existingTrustFactorImages =
//           (await HomeModel.findById(id)).trust_factor_images || [];
//         updateObject.trust_factor_images = existingTrustFactorImages.concat(
//           req.files.trust_factor_images.map((image) => image.filename)
//         );
//       }
//     }

//     // update
//     const updatedData = await HomeModel.findByIdAndUpdate(id, updateObject, {
//       new: true,
//     });

//     res.status(200).json({ msg: "Update successful", data: updatedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.editHome = async (req, res) => {
  let { id } = req.params;
  try {
    let dup = JSON.parse(req.body.dup);
    let files = req.files;
    console.log("recived Files", files);
    let product = files.product?.map((e) => e.filename);
    console.log("process file", product);
    if (product) {
      dup.banner_images = [...dup.banner_images, ...product];
    }

    let data = await HomeModel.findByIdAndUpdate(id, { ...dup }, { new: true });
    res.status(200).send({ msg: "Home Data Update Successfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
