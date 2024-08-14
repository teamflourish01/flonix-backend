const express = require("express");
const multer = require("multer");
const {
  getAllTestimonials,
  getTestimonialsById,
  addTestimonials,
  deleteTestimonials,
  updateTestimonial,
} = require("../controller/TestimonialsController");
const SetImgsize = require("../middleware/ImagesizeMiddleware");

const testimonialsRouter = express.Router();

//multer middalware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/testimonials");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
const dimensions = {
  image: { width: 125, height: 143 },
};


testimonialsRouter
  .get("/", getAllTestimonials)
  .get("/:id", getTestimonialsById)
  .post("/add", upload.single("image"),SetImgsize(dimensions), addTestimonials)
  .delete("/delete/:id", deleteTestimonials)
  .put("/edit/:id", upload.single("image"),SetImgsize(dimensions), updateTestimonial);

module.exports = testimonialsRouter;
