const express = require("express");
const {
  addContectdetail,
  updateContectdetail,
  getContectDetails,
  getContectdetailsByid,
} = require("../controller/ContectDetailsController");

const contectdetailsRouter = express.Router();

contectdetailsRouter
  .get("/", getContectDetails)
  .post("/add", addContectdetail)
  .get("/:id", getContectdetailsByid)
  .put("/edit/:id", updateContectdetail);

module.exports = contectdetailsRouter;
