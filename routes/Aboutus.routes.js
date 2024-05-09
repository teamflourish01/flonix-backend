const express = require("express");
const {
  getAboutus,
  addAboutus,
  getAboutusById,
  updateAboutus,
  deleteLogoImg,
} = require("../controller/AboutusController");
const aboutusRouter = express.Router();
const multer = require("multer");
const { get } = require("mongoose");

//multer middalware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

aboutusRouter
  .get("/", getAboutus)
  .post(
    "/add",
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "logoimages", maxCount: 5 },
    ]),
    addAboutus
  )
  .get("/:id", getAboutusById)
  .delete("/deleteimg/:id/:index", deleteLogoImg)
  .put(
    "/edit/:id",
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "logoimages", maxCount: 10 },
    ]),
    updateAboutus
  );

module.exports = aboutusRouter;
