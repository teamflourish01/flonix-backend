const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const AboutFlonixSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    keyfeature: { type: Array },
    video: { type: String, required: true },
  },
  options
);

const AboutFlonixModel = mongoose.model("Aboutflonix", AboutFlonixSchema);

module.exports = AboutFlonixModel;
