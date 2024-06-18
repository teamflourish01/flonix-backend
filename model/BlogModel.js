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
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "BlogCategory",
    },
    banner_image: {
      type: String,
    },
    bannerimg_alt: { type: String },
    first_image: {
      type: String,
    },
    firstimg_alt: { type: String },
    first_toggle: {
      type: Boolean,
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
    secondimg_alt: { type: String },
    second_toggle: {
      type: Boolean,
    },
    text3: {
      type: String,
    },
    third_image: {
      type: String,
    },
    thirdimg_alt: { type: String },
    third_toggle: {
      type: Boolean,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  options
);

BlogSchema.pre("findOneAndUpdate", async function (next, res) {
  try {
    let update = this.getUpdate();
    if (update) {
      console.log(update.name);
      let exist = await BlogModel.find({ name: update.name });
      console.log(exist);
      for (let element of exist) {
        if (element._id.toString() !== update._id.toString()) {
          let error = new Error("Name Should be unique");
          error.status = 400;
          // console.log(error);
          next(error);
        } else {
          continue;
        }
      }
      next();
    }
  } catch (error) {
    next(error);
  }
});

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = { BlogModel };
