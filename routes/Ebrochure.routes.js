const express = require("express");
const multer = require("multer");
const {
  getAlleBrochure,
  getEbrouserById,
  addEbrochure,
  deleteBrochure,
  updateEbrochure,
} = require("../controller/EbrochureController");

const brouchureRouter = express.Router();

//multer middalware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/ebrochure");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

brouchureRouter
  .get("/", getAlleBrochure)
  .get("/:id", getEbrouserById)
  .post("/add", upload.single("doc"), addEbrochure)
  .delete("/delete/:id", deleteBrochure)
  .put("/edit/:id", upload.single("doc"), updateEbrochure);

module.exports = brouchureRouter;
