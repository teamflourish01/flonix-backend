const mongoose = require("mongoose");

const WhatsappSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const WhatsappModel = mongoose.model("Inquiery", WhatsappSchema);

module.exports = WhatsappModel;
