const axios = require("axios");
const WhatsappModel = require("../model/WhatsappModel");

const whatsappApiUrl = process.env.WHATSAPP_API_URL;
const whatsappToken = process.env.WHATSAPP_TOKEN;

exports.sendMessage = async (req, res) => {
  // const { name, email, message } = req.body;
  // const payload = {
  //   messaging_product: "whatsapp",
  //   to: "91757504888", // Replace with the recipient's WhatsApp number
  //   type: "text",
  //   text: {
  //     body: `Name: ${name}\nEmail:${email}\nMessage: ${message}`,
  //   },
  // };
  // try {
  //   const response = await axios.post(whatsappApiUrl, payload, {
  //     headers: {
  //       Authorization: `Bearer ${whatsappToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log("Response from WhatsApp API:", response.data);
  //   res.status(200).send("Message sent successfully!");
  // } catch (error) {
  //   console.error(
  //     "Error sending message:",
  //     error.response ? error.response.data : error.message
  //   );
  //   res.status(500).send("Failed to send message.");
  // }

  const { name, email, phone, city, message } = req.body;

  // Save to database
  const newInquiry = new WhatsappModel({ name, email, phone, city, message });
  try {
    await newInquiry.save();

    // Send message to WhatsApp
    const payload = {
      messaging_product: "whatsapp",
      to: "917575043888", // Replace with the recipient's WhatsApp number
      type: "text",
      text: {
        body: `Name:- ${name}\nEmail:- ${email}\nMobile:- ${phone}\nCity:- ${city}\nMessage:- ${message}`,
      },
    };
    const response = await axios.post(whatsappApiUrl, payload, {
      headers: {
        Authorization: `Bearer ${whatsappToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Response from WhatsApp API:", response.data);
    res.status(200).send("Message sent and saved successfully!");
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to send and save message.");
  }
};

exports.getInquiery = async (req, res) => {
  let { page, search } = req.query;
  let query = {};

  if (search) {
    query.name = { $regex: `^${search}`, $options: `i` };
  }

  try {
    let data;
    if (page) {
      data = await WhatsappModel.find(query)
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({
        data,
        msg: "Inquiry found with pagination successfully",
      });
    } else {
      data = await WhatsappModel.find(query);
      res.status(200).send({
        data,
        msg: "Inquiry found successfully",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.getInquiryDetail=async(req,res)=>{
  let { id } = req.params;
  try {
    let data = await WhatsappModel.findById(id);
    res.status(200).send({
      data,
      msg: "Inquiry Details Retrived Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
}