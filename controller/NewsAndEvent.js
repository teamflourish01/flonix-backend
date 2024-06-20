const { NewsAndEventsModel } = require("../model/NewsAndEvent");

exports.addNewsAndEvents = async (req, res) => {
  try {
    const { cardheading, slug } = req.body;
    const exist = await NewsAndEventsModel.findOne({
      $or: [{ cardheading }, { slug }],
    });
    if (exist) {
      res.status(400).send({
        exist,
        msg: "Events & Slug is Alredy exist !",
      });
    } else {
      const data = NewsAndEventsModel(req.body);
      await data.save();
      res.status(200).send({ msg: "News & Events successfuly Added", data });
    }
  } catch (error) {
    res.status(404).send({
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

exports.addDetailSingleImg = async (req, res) => {
  try {
    const DetailsImg = req.file.filename;
    res
      .status(200)
      .json({ msg: "Details image add successfuly", data: DetailsImg });
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
    const { page, limit, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;
    const query = search ? { cardheading: { $regex: new RegExp(`^${search}`, "i") } } : {};
    
    let data, total;

    if (search) {
      // Fetch all documents without pagination if search query is provided
      data = await NewsAndEventsModel.find(query);
      total = data.length;
    } else {
      // Apply pagination if search query is not provided
      total = await NewsAndEventsModel.countDocuments(query);
      data = await NewsAndEventsModel.find(query).skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    res.status(200).json({ msg: "News And Events successfully fetched", data, count: total });
  } catch (error) {
    res.status(400).json({ msg: error.message, error });
  }
};

// fetch N & E Data By Id

exports.fetchNewsAndEventsById = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await NewsAndEventsModel.findOne({ slug: slug });
    res.status(200).json({ msg: "News And Events successfuly Recived", data });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

// Delete News And Events Data

exports.deleteNewsAndEvents = async (req, res) => {
  const slug = req.params;
  try {
    await NewsAndEventsModel.findOneAndDelete(slug);
    res.status(200).json({ msg: "News and Events Data Delete Successfuly" });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      error,
    });
  }
};

exports.updateNewsAndEvents = async (req, res) => {
  let { slug } = req.params;
  try {
    let dup = JSON.parse(req.body.dup);
    let files = req.files;
    let product = files["detailimages"]?.map((e) => e.filename);

    if (product) {
      dup.detailimages = [...dup.detailimages, ...product];
    }
    // single card img
    if (files.cardimage) {
      const crdimg = files.cardimage[0].filename;
      dup.cardimage = crdimg;
    }
    // single details img
    if (files.detailimage) {
      const dtlImg = files.detailimage[0].filename;
      dup.detailimage = dtlImg;
    }
    const { cardheading, slug: newSlug } = req.body;
    const exist = await NewsAndEventsModel.findOne({
      $or: [{ cardheading }, { slug: newSlug }],
    });
    if (
      exist &&
      (exist.cardheading === cardheading || exist.slug === newSlug)
    ) {
      return res.status(400).send({
        exist,
        msg: "Events & Slug is Alredy exist !",
      });
    } else {
      let data = await NewsAndEventsModel.findOneAndUpdate(
        { slug: slug },
        { ...dup },
        { new: true }
      );

      res
        .status(200)
        .send({ msg: "News And Event Data Update Successfuly", data });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
