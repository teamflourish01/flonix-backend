const express = require("express");
const { connection } = require("./db");
require("dotenv").config("");
const app = express();
const cors = require("cors");
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
<<<<<<< HEAD
const UserRouter = require("./routes/User.routes");

=======
const whatsappRouter = require("./routes/Whatsapp.routes");
>>>>>>> 59f4a035d3afbeb65240ec3c8090763e7c3baff8

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
app.use("/",UserRouter)
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
app.use("/send", whatsappRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
});
