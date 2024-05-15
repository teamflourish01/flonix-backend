const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const EbrochureSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    doc: {
      type: String,
    },
  },
  options
);

const EbrochureModel = mongoose.model("Ebrochure", EbrochureSchema);

module.exports = EbrochureModel;
