const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const HomeSchema = new mongoose.Schema(
  {
    banner_heading: {
      type: String,
      require: true,
    },
    banner_image: {
      type: Array,
    },
    about_heading: {
      type: String,
      require: true,
    },
    about_pera: {
      type: String,
    },
    about_points: {
      type: Array,
    },
    top_product: {
      type: Array,
    },
    trust_factor_images: {
      type: Array,
    },
    trust_factor_text: {
      type: Array,
    },
    our_products: {
      type: Array,
    },
    our_distributor_text: {
      type: String,
    },
    our_distributor_logo: {
      type: Array,
    },
    our_blogs: {
      type: Array,
    },
  },
  options
);

const HomeModel = mongoose.model("Home", HomeSchema);
module.exports = {
  HomeModel,
};
