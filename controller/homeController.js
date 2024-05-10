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

// exports.editHome = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const exist = await HomeModel.findById(id);

//     if (!exist) {
//       return res.status(404).json({ error: "Home Not Found" });
//     }

//     if (req.files.length > 0) {
//       if (req.body.banner_images) {
//         const bnewImages = req.files.map((file) => file.filename);

//         //concatinate images
//         const updateImages = exist.banner_images
//           ? [...exist.banner_images, ...bnewImages]
//           : bnewImages;
//         req.body.banner_images = updateImages;
//       }
//       if (req.body.trust_factor_images) {
//         const tFImages = req.files.map((file) => file.filename);
//         const updatedTFImages = exist.trust_factor_images
//           ? [...exist.trust_factor_images, ...tFImages]
//           : tFImages;
//         req.body.trust_factor_images = updatedTFImages;
//       }
//       if (req.body.our_distributor_logo) {
//         const dbLogos = req.files.map((file) => file.filename);
//         const updatedDbLogos = exist.our_distributor_logo
//           ? [...exist.our_distributor_logo, ...dbLogos]
//           : dbLogos;
//         req.body.our_distributor_logo = updatedDbLogos;
//       }
//     }

//     //update api
//     const data = await HomeModel.findByIdAndUpdate(id, req.body, { new: true });

//     if (!data) {
//       return res.status(404).json({ error: "Home not found" });
//     }

//     res.status(200).send({
//       msg: "Home Page Edited successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).send({
//       msg: "Couldn't Edit Home",
//       error,
//     });
//   }
// };

// exports.editHome = async (req, res) => {
//   try {
//     const id = req.params.id;

//     let bannerimages;
//     let trustFactorImages;
//     let logoImages;

//     // Banner_images logic
//     if (req.files && req.files.banner_images) {
//       bannerimages = req.files.banner_images;
//       req.body.banner_images = bannerimages.map((image) => image.filename);
//     }
//     // Trust_fec_images logic
//     if (req.files && req.files.trust_factor_images) {
//       trustFactorImages = req.files.trust_factor_images;
//       req.body.trust_factor_images = trustFactorImages.map((image) => image.filename);
//     }

//     // logo Images
//     if (req.files && req.files.our_distributor_logo) {
//       logoImages = req.files.our_distributor_logo;
//       req.body.our_distributor_logo = logoImages.map((image) => image.filename);
//     }

//     const existHome = await HomeModel.findById(id);
//     const existbannerImages = existHome.banner_images || [];
//     const existTrustFactorImages = existHome.trust_factor_images || [];
//     const existLogoImages = existHome.our_distributor_logo || [];

//     const allbannerImages = [
//       ...existbannerImages,
//       ...(req.body.banner_images || []),
//     ];

//     const allTrustFactorImages = [
//       ...existTrustFactorImages,
//       ...(req.body.trust_factor_images || []),
//     ];
//     const allLogoImages = [
//       ...existLogoImages,
//       ...(req.body.our_distributor_logo || []),
//     ];

//     const data = await HomeModel.findByIdAndUpdate(
//       id,
//       {
//         ...req.body,
//         banner_images: allbannerImages,
//         trust_factor_images: allTrustFactorImages,
//         our_distributor_logo: allLogoImages,
//       },
//       { new: true }
//     );

//     res.status(200).json({ msg: "Update successfuly", data });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.editHome = async (req, res) => {
  try {
    const id = req.params.id;

    // Extract all fields from req.body
    const {
      banner_heading,
      about_heading,
      about_pera,
      about_points,
      about_video,
      top_product,
      trust_factor_text,
      our_products,
      our_distributor_text,
      our_blogs,
    } = req.body;

    // Build the update object with non-file fields
    let updateObject = {
      banner_heading,
      about_heading,
      about_pera,
      about_points,
      about_video,
      top_product,
      trust_factor_text,
      our_products,
      our_distributor_text,
      our_blogs,
    };
    console.log("Files received:", req.files);

    if (req.files) {
      if (req.files.banner_images) {
        updateObject.banner_images = req.files.banner_images.map(
          (image) => image.filename
        );
      }

      if (req.files.our_distributor_logo) {
        updateObject.our_distributor_logo = req.files.our_distributor_logo.map(
          (image) => image.filename
        );
      }
      
      if (req.files.trust_factor_images) {
        updateObject.trust_factor_images = req.files.trust_factor_images.map(
          (image) => image.filename
        );
      }
    }

    // Perform the update
    const updatedData = await HomeModel.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

    res.status(200).json({ msg: "Update successful", data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
