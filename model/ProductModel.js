const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const ProductSchema = new mongoose.Schema(
  {
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: Array,
    },
    image_alt: {
      type: Array,
    },
    key_features: {
      type: Array,
    },
    mark: {
      type: Array,
    },
    mark_text: {
      type: Array,
    },
    specification: {
      type: Object,
    },
    details: {
      type: Object,
    },
    performance: {
      type: Object,
    },
    slug: {
      type: String,
      unique: true,
      require: true,
    },
  },
  options
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
