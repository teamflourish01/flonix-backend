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
      
    },
    banner_images: {
      type: Array,
    },
    about_heading: {
      type: String,
      
    },
    about_pera: {
      type: String,
    },
    about_points: {
      type: Array,
    },
    about_video: {
      type: String,
    },
    top_product: [
      { type: mongoose.Schema.Types.ObjectID, ref: "Product"},
    ], 
    trust_factor_images: {
      type: Array,
    },
    trust_factor_text: {
      type: Array,
    },
    our_products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    ],
    our_distributor_text: {
      type: String,
    },
    our_distributor_logo: {
      type: Array,
    },
    our_blogs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Blog"},
    ],
  },
  options
);

const HomeModel = mongoose.model("Home", HomeSchema);
module.exports = {
  HomeModel,
};
