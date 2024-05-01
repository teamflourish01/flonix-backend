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
    const searchQuery = req.query.search; 

    const skip = (page - 1) * limit;

    let query = {};
    if (searchQuery) {
      query.generalheading = { $regex: new RegExp(searchQuery, 'i') }; 
    }

    const total = await NewsAndEventsModel.countDocuments(query);

    const data = await NewsAndEventsModel.find(query).skip(skip).limit(limit);
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
  console.log(req.files, "files");

  try {
    const Id = req.params.Id;
    const {
      generalheading,
      generaltext,
      cardheading,
      date,
      place,
      cardtext,
      detailheading,
      detailtext,
      video,
    } = req.body;
    let singleImage;
    let detailImages;
    if (req.files.cardimage) {
      singleImage = req.files.cardimage;
      req.body.cardimage = singleImage[0].filename;
    }

    if (req.files && req.files.detailimages) {
      detailImages = req.files.detailimages;
      req.body.detailimages = detailImages.map((image) => image.filename);
    }
    // push new Multiple img logic
    const existingNewsAndEvents = await NewsAndEventsModel.findById(Id);
    existingDetailImages = existingNewsAndEvents.detailimages || [];

    // Combine existing and new detail images
    const allDetailImages = [
      ...existingDetailImages,
      ...(req.body.detailimages || []),
    ];

    const newsAndEvents = await NewsAndEventsModel.findByIdAndUpdate(
      Id,
      { ...req.body, detailimages: allDetailImages },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Data updated successfully", newsAndEvents });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// in-Edit-form Multiple Delete IMG Sepretly

exports.deleteMultipleImg = async (req, res) => {
  const { id, imgindex } = req.params;
  try {
    const doc = await NewsAndEventsModel.findById(id);

    if (!doc) {
      return res.status(404).json({ error: "doc(multiple-img) is Not Found" });
    }
    // Remove the image at the specified index
    doc.detailimages.splice(imgindex, 1);

    // updateted imges
    await doc.save();

    res.status(200).json({ msg: "Image Delete Successfuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};
