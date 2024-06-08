const axios = require("axios");
const WhatsappModel = require("../model/WhatsappModel");

const whatsappApiUrl =
  "https://graph.facebook.com/v19.0/305990135939726/messages";
const whatsappToken =
  "EAAVXY2LxPugBO3kZCU9rZAGLVy5ZCA1C5XO1jN2tMIZA6gLnvoaa38ZAOTyiKWOHkwygPlglZCDOxVUOWouYjQzIrkcdyB5W4ccfjQG1LLH1YuEeU0hw4ySWyjLNmszXjrDQ8IBdBXMk7mKhGZBQiZBoFDbTy74bmkx26vl8LNeA5r8rsaickFMn4h41xRqUYS3tme9Sp1x45NUi2saZCeVWl";

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

  const { name, email, message } = req.body;
  
  // Save to database
  const newInquiry = new WhatsappModel({ name, email, message });
  try {
    await newInquiry.save();

    // Send message to WhatsApp
    const payload = {
      messaging_product: "whatsapp",
      to: "91757504888", // Replace with the recipient's WhatsApp number
      type: "text",
      text: {
        body: `Name: ${name}\nEmail:${email}\nMessage: ${message}`,
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
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).send("Failed to send and save message.");
  }
};
