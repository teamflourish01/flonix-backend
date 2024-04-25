const express = require("express");
const {
  addNewsAndEvents,
  addnewsSingleImage,
  addnewsMulitipleImages,
  fetchAllNewsEvents,
  fetchNewsAndEventsById,
  deleteNewsAndEvents,
  updateNewsAndEvents,
} = require("../controller/NewsAndEvent");
const multer = require("multer");
const newsandeventsRouter = express.Router();

// multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/newsAndevents");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

newsandeventsRouter
  .post("/add", addNewsAndEvents)
  .post("/add/singleimage", upload.single("cardimage"), addnewsSingleImage)
  .post(
    "/add/multipleimages",
    upload.array("detailimages"),
    addnewsMulitipleImages
  )
  .get("/", fetchAllNewsEvents)
  .get("/:id", fetchNewsAndEventsById)
  .delete("/:id", deleteNewsAndEvents)
  .put("/edit/:Id", upload.array("detailimages"), updateNewsAndEvents);

module.exports = newsandeventsRouter;
