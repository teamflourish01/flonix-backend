const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  imgdescription: {
    type: String,
  },
});

const CertificateModel = mongoose.model("Certificate", CertificateSchema);

module.exports = CertificateModel;
