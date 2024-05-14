const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    banner_image: {
      type: String,
    },
    first_image: {
      type: String,
    },
    text1: {
      type: String,
    },
    text2: {
      type: String,
    },
    second_image: {
      type: String,
    },
    text3: {
      type: String,
    },
    third_image: {
      type: String,
    },
  },
  options
);

const BlogModel=mongoose.model("Blog",BlogSchema)
module.exports={BlogModel}

