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
    name: {
      type: String,
      require: true,
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
  },
  options
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
