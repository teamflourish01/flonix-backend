const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const CertificateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required:true
    },
    imgdescription: {
      type: String,
    },
  },
  options
);

const CertificateModel = mongoose.model("Certificate", CertificateSchema);

module.exports = CertificateModel;
