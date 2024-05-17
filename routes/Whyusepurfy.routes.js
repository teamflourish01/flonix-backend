const express = require("express");
const multer = require("multer");
const {
  getAllpurify,
  addPurify,
  getPurifyById,
  updatePurify,
} = require("../controller/WhyusepurfyController");
const robenifitsRouter = express.Router();

//multer middale ware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/robenefits");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
const cpUpload = upload.fields([
  { name: "first_image", maxCount: 1 },
  { name: "seconed_image", maxCount: 1 },
]);

robenifitsRouter
  .get("/", getAllpurify)
  .get("/:id", getPurifyById)
  .post("/add", cpUpload, addPurify)
  .put(
    "/edit/:id",
    upload.fields([
      { name: "first_image", maxCount: 1 },
      { name: "seconed_image", maxCount: 1 },
    ]),
    updatePurify
  );

module.exports = robenifitsRouter;
