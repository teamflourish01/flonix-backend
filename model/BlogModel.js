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
    category:{
      type:mongoose.Types.ObjectId,
      ref:"BlogCategory",
    },
    banner_image: {
      type: String,
    },
    first_image: {
      type: String,
    },
    first_toggle:{
      type: Boolean
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
    second_toggle:{
      type: Boolean
    },
    text3: {
      type: String,
    },
    third_image: {
      type: String,
    },
    third_toggle:{
      type: Boolean
    },
  },
  options
);

const BlogModel=mongoose.model("Blog",BlogSchema)
module.exports={BlogModel}

