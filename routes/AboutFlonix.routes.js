const express = require("express");
const {
  getAboutFlonix,
  addAboutFlonix,
  getAboutFlonixById,
  updateAboutFlonix,
} = require("../controller/AboutFlonixController");

const aboutflonixRouter = express.Router();

aboutflonixRouter.get("/", getAboutFlonix)
  .post("/add", addAboutFlonix)
  .get("/:id", getAboutFlonixById)
  .put("/edit/:id", updateAboutFlonix);

module.exports=aboutflonixRouter