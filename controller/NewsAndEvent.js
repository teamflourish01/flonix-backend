const { NewsAndEventsModel } = require("../model/NewsAndEvent");

exports.addNewsAndEvents = async (req, res) => {
  try {
    const data = NewsAndEventsModel(req.body);
    await data.save();
    res.status(200).send({ msg: "News & Events successfuly Added", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addnewsSingleImage = async (req, res) => {
  try {
    const cardimage = req.file.filename;

    res
      .status(200)
      .json({ msg: "Single Image successfuly Added", data: cardimage });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

exports.addnewsMulitipleImages = async (req, res) => {
  try {
    let arr = [];
    for (let file of req.files) {
      arr.push(file.filename);
    }

    res
      .status(200)
      .json({ msg: "Multiple Images successfuly Added", data: arr });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// fetch All N & E Data

exports.fetchAllNewsEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await NewsAndEventsModel.countDocuments({});

    const data = await NewsAndEventsModel.find({}).skip(skip).limit(limit);
    res
      .status(200)
      .json({ msg: "News And Events successfuly Fetch", data, count: total });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// fetch N & E Data By Id

exports.fetchNewsAndEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const DataById = await NewsAndEventsModel.findById(id);
    res
      .status(200)
      .json({ msg: "News And Events successfuly Fetch", DataById });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// Delete News And Events Data

exports.deleteNewsAndEvents = async (req, res) => {
  try {
    const id = req.params.id;
    await NewsAndEventsModel.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ msg: "News and Events Data Delete Successfuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// Update Data Logic

exports.updateNewsAndEvents = async (req, res) => {
  try {
    const Id = req.params.Id;
    const newsandevents = await NewsAndEventsModel.findById(Id);

    //single image

    if (req.file) {
      req.body.cardimage = req.file.filename;
    }

    // Multiple image Add logic
    if (req.files.length > 0) {
      const newImages = req.files.map((file) => file.filename);
      const updateImages = newsandevents.detailimages
        ? [...newsandevents.detailimages, ...newImages]
        : newImages;
      req.body.detailimages = updateImages;
    }

    const newsAndEvents = await NewsAndEventsModel.findByIdAndUpdate(
      Id,
      req.body,
      { new: true }
    );
    if (!newsAndEvents) {
      return res.status(404).json({ error: "News & Events Not Found" });
    }
    res
      .status(200)
      .json({ msg: "News&Events Update Successfuly", newsAndEvents });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};
