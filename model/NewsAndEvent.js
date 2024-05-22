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
    cardheading: { type: String, require: true },
    date: { type: Date },
    place: { type: String, require: true },
    cardtext: { type: String, require: true },
    detailheading: { type: String, require: true },
    detailtext: { type: String, require: true },
    video: { type: String },
    detailimage: { type: String },
    detailimages: { type: [String] },
  },
  options
);

const NewsAndEventsModel = mongoose.model("Newsandevents", NewsandEventsSchema);

module.exports = { NewsAndEventsModel };
