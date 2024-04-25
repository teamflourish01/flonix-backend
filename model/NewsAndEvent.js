const mongoose = require("mongoose");

const NewsandEventsSchema = new mongoose.Schema({
  generalheading: { type: String, require: true },
  generaltext: { type: String, require: true },
  cardimage: { type: String },
  cardheading: { type: String, require: true },
  date: { type: Date },
  place: { type: String, require: true },
  cardtext: { type: String, require: true },
  detailheading: { type: String, require: true },
  detailtext: { type: String, require: true },
  video: { type: String },
  detailimages: { type: [String] },
});

const NewsAndEventsModel = mongoose.model("Newsandevents", NewsandEventsSchema);

module.exports = { NewsAndEventsModel };