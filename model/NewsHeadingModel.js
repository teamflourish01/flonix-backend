const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const NewsHeadingSchema = new mongoose.Schema(
  {
    heading: { type: String, require: true },
    description: { type: String, require: true },
  },
  options
);

const NewsHeadingModel = mongoose.model("Newsheading", NewsHeadingSchema);

module.exports = NewsHeadingModel;
