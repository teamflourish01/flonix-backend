const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const {
  getHome,
  addHome,
  getHomeSingle,
  editHome,
  deleteImages,
} = require("../controller/homeController");
const SetImgsize = require("../middleware/ImagesizeMiddleware");
const homeRouter = express.Router();

//multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/home");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Image Size Validation
const dimensions = {
  banner_images: { width: 651, height: 612 },
  trust_factor_images: { width: 80, height: 80 },
  our_distributor_logo: { width: 160, height: 120 },
};

homeRouter
  .get("/", getHome)
  .post("/add", addHome)
  .get("/:id", getHomeSingle)
  .delete("/deleteimg/:id/:index", deleteImages)
  .put(
    "/edit/:id",
    upload.fields([
      { name: "banner_images", maxCount: 10 },
      { name: "trust_factor_images", maxCount: 5 },
      { name: "our_distributor_logo", maxCount: 5 },
    ]),
    SetImgsize(dimensions),
    editHome
  );

module.exports = homeRouter;
