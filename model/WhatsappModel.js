const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const WhatsappSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  options
);

const WhatsappModel = mongoose.model("Inquiery", WhatsappSchema);

module.exports = WhatsappModel;
