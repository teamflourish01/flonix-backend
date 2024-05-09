const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const HomeBannerSchema = new mongoose.Schema(
  {
    bannerlable: { type: String, required: true },
    bannerimages: { type: Array, required: true },
  },
  options
);
const HomebannerModel = mongoose.model("Homebanner", HomeBannerSchema);

module.exports = HomebannerModel;
