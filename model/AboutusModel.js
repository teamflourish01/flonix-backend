const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const AboutusSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
    },
    bannerheading: {
      type: String,
    },
    bannerdescription: {
      type: String,
    },
    logoimages: {
      type: Array,
    },
    mission: {
      type: String,
    },
    vision: {
      type: String,
    },
    goals: {
      type: String,
    },
  },
  options
);

const AboutusModel = mongoose.model("Aboutus", AboutusSchema);

module.exports = AboutusModel;
