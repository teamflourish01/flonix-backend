const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const NewsandEventsSchema = new mongoose.Schema(
  {
    cardimage: { type: String },
    cardimg_alt: { type: String },
    cardheading: { type: String, required: true, unique: true },
    date: { type: Date },
    place: { type: String, required: true },
    cardtext: { type: String, required: true },
    detailheading: { type: String, required: true },
    detailtext: { type: String, required: true },
    video: { type: String, required: true },
    detailimage: { type: String },
    detailimg_alt: { type: String },
    detailimages: { type: [String] },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options
);

const NewsAndEventsModel = mongoose.model("Newsandevents", NewsandEventsSchema);

module.exports = { NewsAndEventsModel };
