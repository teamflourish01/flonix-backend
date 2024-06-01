const express = require("express");
const {
  addNewsAndEvents,
  addnewsSingleImage,
  addnewsMulitipleImages,
  fetchAllNewsEvents,
  fetchNewsAndEventsById,
  deleteNewsAndEvents,
  updateNewsAndEvents,
  deleteMultipleImg,
  addDetailSingleImg,
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
  .post("/add/detailimg", upload.single("detailimage"), addDetailSingleImg)
  .get("/", fetchAllNewsEvents)
  .get("/:slug", fetchNewsAndEventsById)
  .delete("/:slug", deleteNewsAndEvents)  
  .put(
    "/edit/:slug",
    upload.fields([
      { name: "cardimage", maxCount: 1 },
      { name: "detailimages", maxCount: 10 },
      { name: "detailimage", maxCount: 1 },
    ]),
    updateNewsAndEvents
  );

module.exports = newsandeventsRouter;
