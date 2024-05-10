const express = require("express");
const multer = require("multer");
const {
  getHome,
  addHome,
  getHomeSingle,
  editHome,
} = require("../controller/homeController");
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

homeRouter
  .get("/", getHome)
  .post("/add", addHome)
  .get("/:id", getHomeSingle)
  .put(
    "/edit/:id",
    upload.fields([
      { name: "banner_images",maxCount:10},
      { name: "trust_factor_images",maxCount:5 },
      { name: "our_distributor_logo",maxCount:5},
    ]),
    editHome
  );

module.exports = homeRouter;
