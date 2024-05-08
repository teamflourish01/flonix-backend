const HomebannerModel = require("../model/HomeBannerModel");

exports.getHomeBanner = async (req, res) => {
  try {
    let data = await HomebannerModel.find({});
    res.status(200).json({ msg: "Home-Banner get successfuly", data });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
      error,
    });
  }
};

exports.addHomeBanner = async (req, res) => {
  try {
    const bannerimages = req.files.map((file) => file.filename);
    const data = new HomebannerModel({ ...req.body, bannerimages });
    await data.save();
    res.status(200).json({ msg: "Banner Add successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "Banner Not Add", error });
  }
};

exports.gethomebannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await HomebannerModel.findById(id);
    res.status(200).json({ msg: "Home-Banner fetched", data });
  } catch (error) {
    res.status(400).json({ msg: error.message, error });
  }
};

exports.updateHomeBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const homebanner = await HomebannerModel.findById(id);

    if (!homebanner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    if (req.files.length > 0) {
      const newImages = req.files.map((file) => file.filename);

      // concatinate images
      const updateImages = homebanner.bannerimages
        ? [...homebanner.bannerimages, ...newImages]
        : newImages;
      req.body.bannerimages = updateImages;
    }
    const data = await HomebannerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.status(200).json({ msg: "Banner updated successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Banner could not be updated", error: error.message });
  }
};

exports.deletebannerImg = async (req, res) => {
  const { id, index } = req.params;
  try {
    const doc = await HomebannerModel.findById(id);

    if (!doc) {
      return res.status(404).json({ error: "banner img is not found " });
    }
    doc.bannerimages.splice(index, 1);
    await doc.save();
    res.status(200).json({ msg: "IMG Delete Succefuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};
