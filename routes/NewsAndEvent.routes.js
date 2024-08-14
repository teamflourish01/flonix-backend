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
const SetImgsize = require("../middleware/ImagesizeMiddleware");
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

// Image Size Validation
const dimensions = {
  cardimage: { width: 420, height: 252 },
  detailimage: { width: 1320, height: 517 },
  detailimages: { width: 430, height: 313 },
};

newsandeventsRouter
  .post("/add", addNewsAndEvents)
  .post(
    "/add/singleimage",
    upload.single("cardimage"),
    SetImgsize(dimensions),
    addnewsSingleImage
  )
  .post(
    "/add/multipleimages",
    upload.array("detailimages"),
    SetImgsize(dimensions),
    addnewsMulitipleImages
  )
  .post(
    "/add/detailimg",
    upload.single("detailimage"),
    SetImgsize(dimensions),
    addDetailSingleImg
  )
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
    SetImgsize(dimensions),
    updateNewsAndEvents
  );

module.exports = newsandeventsRouter;
