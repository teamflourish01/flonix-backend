const express = require("express");
const multer = require("multer");
const {
  addHomeBanner,
  updateHomeBanner,
  getHomeBanner,
  gethomebannerById,
  deletebannerImg,
} = require("../controller/HomeBannerController");

const homebannerRouter = express.Router();

//multer middaleware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/homebanner");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

homebannerRouter
  .get("/", getHomeBanner)
  .get("/:id", gethomebannerById)
  .post("/add", upload.array("bannerimages"), addHomeBanner)
  .delete("/delete/:id/:index", deletebannerImg)
  .put("/edit/:id", upload.array("bannerimages"), updateHomeBanner);

module.exports = homebannerRouter;
