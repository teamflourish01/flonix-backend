const express = require("express");
const { connection } = require("./db");
require("dotenv").config("");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const cron = require("node-cron");
const app = express();

const categoryRouter = require("./routes/category.routes");
const ProductRouter = require("./routes/product.routes");
const { ProductImageRouter } = require("./middleware/ProductMiddleware");
const newsandeventsRouter = require("./routes/NewsAndEvent.routes");
const { networkRouter } = require("./routes/network.routes");
const { outletRouter } = require("./routes/outlet.routes");
const aboutusRouter = require("./routes/Aboutus.routes");
const certificateRouter = require("./routes/Certificate.routes");
const contectdetailsRouter = require("./routes/ContectDetails.routes");
const newsHeadingRouter = require("./routes/NewsHeading.routes");
const homeRouter = require("./routes/home.routes");
const { blogCategoryRouter } = require("./routes/Blogcategory.routes");
const testimonialsRouter = require("./routes/Testimonials.routes");
const brouchureRouter = require("./routes/Ebrochure.routes");

const robenifitsRouter = require("./routes/Whyusepurfy.routes");

const { BlogRouter } = require("./routes/Blog.routes");

const UserRouter = require("./routes/User.routes");

const whatsappRouter = require("./routes/Whatsapp.routes");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("public"));

// all routes are used Below

// const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));

// all image uploads routes
app.use("/", ProductImageRouter);

// all routes are used Below
app.use("/", UserRouter);
app.use("/", categoryRouter);
app.use("/", ProductRouter);
app.use("/", categoryRouter);
app.use("/newsandevent", newsandeventsRouter);
app.use("/", networkRouter);
app.use("/", outletRouter);
app.use("/", blogCategoryRouter);
app.use("/aboutus", aboutusRouter);
app.use("/certificate", certificateRouter);
app.use("/contect", contectdetailsRouter);
app.use("/newsheading", newsHeadingRouter);
app.use("/home", homeRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/ebrochure", brouchureRouter);
app.use("/robenefits", robenifitsRouter);
app.use("/", BlogRouter);
app.use("/inquiry", whatsappRouter);

// WhatsApp Token Auto Refres in .env Logic

const refreshToken = async () => {
  try {
    const response = await axios.get(
      "https://graph.facebook.com/oauth/access_token",
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          fb_exchange_token: process.env.WHATSAPP_TOKEN,
        },
      }
    );

    const newToken = response.data.access_token;
    updateEnvFile("WHATSAPP_TOKEN", newToken);

    console.log("Token refreshed successfully:", newToken);
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

// Function to update .env file
const updateEnvFile = (key, value) => {
  const envVars = fs.readFileSync(".env", "utf8").split("\n");
  const newEnvVars = envVars.map((line) => {
    if (line.startsWith(`${key}=`)) {
      return `${key}=${value}`;
    }
    return line;
  });

  fs.writeFileSync(".env", newEnvVars.join("\n"));
};

// Schedule a task to run every minits
cron.schedule("0 */1 * * *", async () => {
  await refreshToken();
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
});
