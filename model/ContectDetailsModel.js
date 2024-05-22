const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const ContectdetialsSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    whatsapplink: { type: String, required: true },
    fblink: { type: String, required: true },
    instalink: { type: String, required: true },
    ytlink: { type: String, required: true },
    officeaddress: { type: String, required: true },
    addresslink: { type: String, required: true },
    officenumber: { type: Number, required: true },
  },
  options
);

const ContectdetailsModel = mongoose.model(
  "Contectdetail",
  ContectdetialsSchema
);

module.exports = ContectdetailsModel;
