const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  options
);

const TestimonialModel = mongoose.model("Testimonials", TestimonialSchema);

module.exports = TestimonialModel;
