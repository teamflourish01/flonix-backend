const express = require("express");
const multer = require("multer");
const {
  addCertificate,
  getAllCertificate,
  getCertificateById,
  deleteCertificate,
  updateCertificate,
} = require("../controller/CertificateController");

const certificateRouter = express.Router();

//multer middalware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/certificates");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

certificateRouter
  .get("/", getAllCertificate)
  .get("/:id", getCertificateById)
  .post("/add", upload.single("image"), addCertificate)
  .delete("/delete/:id", deleteCertificate)
  .put("/edit/:id", upload.single("image"), updateCertificate);

module.exports = certificateRouter;
