const express = require("express");
const { sendMessage } = require("../controller/WhatsappController");
const whatsappRouter = express.Router();

whatsappRouter.post("/", sendMessage);

module.exports = whatsappRouter;
