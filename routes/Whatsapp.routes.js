const express = require("express");
const {
  sendMessage,
  getInquiery,
  getInquiryDetail,
} = require("../controller/WhatsappController");
const whatsappRouter = express.Router();

whatsappRouter
  .post("/send", sendMessage)
  .get("/", getInquiery)
  .get("/:id", getInquiryDetail);

module.exports = whatsappRouter;
