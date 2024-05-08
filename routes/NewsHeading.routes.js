const express = require("express");
const {
  getNewsHeading,
  addNewsHeading,
  getNewsHeadingById,
  updateNewsHeading,
  deleteNewsHeading,
} = require("../controller/NewsHeadingController");

const newsHeadingRouter = express.Router();

newsHeadingRouter
  .get("/", getNewsHeading)
  .post("/add", addNewsHeading)
  .get("/:id", getNewsHeadingById)
  .delete("/delete/:id", deleteNewsHeading)
  .put("/edit/:id", updateNewsHeading);

module.exports = newsHeadingRouter;
