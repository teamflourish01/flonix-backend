const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const WhyusepurfySchema = new mongoose.Schema(
  {
    main_heading: { type: String },
    left_heading1: { type: String },
    left_heading2: { type: String },
    left_text1: { type: String },
    left_text2: { type: String },
    right_heading1: { type: String },
    right_heading2: { type: String },
    right_text1: { type: String },
    right_text2: { type: String },
    bottom_heading1: { type: String },
    bottom_heading2: { type: String },
    bottom_heading3: { type: String },
    bottom_heading4: { type: String },
    bottom_text1: { type: String },
    bottom_text2: { type: String },
    bottom_text3: { type: String },
    bottom_text4: { type: String },
    first_image: { type: String },
    seconed_image: { type: String },
  },
  options
);

const WhyusepurfyModel = mongoose.model("Whyusepurfy", WhyusepurfySchema);

module.exports = WhyusepurfyModel;
