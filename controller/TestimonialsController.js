const TestimonialModel = require("../model/TestimonialModel");

exports.getAllTestimonials = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await TestimonialModel.find()
        .skip((page - 1) * 12)
        .limit(12);

      res.status(200).send({ msg: "testimonial get successfuly", data });
    } else {
      let data = await TestimonialModel.find();
      res.status(200).send({ msg: "Testimonials recived successfuly", data });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addTestimonials = async (req, res) => {
  try {
    const { name, designation, text } = req.body;
    const temlImage = req.file.filename;

    const newTestimonials = new TestimonialModel({
      name,
      designation,
      text,
      image: temlImage,
    });
    await newTestimonials.save();
    res
      .status(200)
      .json({ msg: "Testimonials add successfuly", data: newTestimonials });
  } catch (error) {
    res.status(400).json({ error: "Testimonials Not Add", error });
  }
};

exports.getTestimonialsById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await TestimonialModel.findById(id);
    res.status(200).send({ msg: "Single Testimonials recived", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteTestimonials = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await TestimonialModel.findByIdAndDelete(id);

    res.status(200).send({ msg: "Testimonials deleted successfully" });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let singleImage;
    if (req.file) {
      singleImage = req.file.filename;
      req.body.image = singleImage;
    }
    const exist = await TestimonialModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "Testimonials not found" });
    }

    const data = await TestimonialModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ error: "Faild to update Testimonials" });
    }
    res.status(200).json({ msg: "Data Update successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "Internal server error", error });
  }
};
