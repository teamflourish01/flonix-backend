const express = require("express");
const { connection } = require("./db");
require("dotenv").config("");
const app=express()
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");

const ProductRouter = require("./routes/product.routes");
const { ProductImageRouter } = require("./middleware/ProductMiddleware");


app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("public"));


// all routes are used Below

app.use("/", categoryRouter);
app.use("/", ProductRouter);

// all image uploads routes
app.use("/", ProductImageRouter);

const newsandeventsRouter = require("./routes/NewsAndEvent.routes");

const { networkRouter } = require("./routes/network.routes");
const { outletRouter } = require("./routes/outlet.routes");

const aboutusRouter = require("./routes/Aboutus.routes");
const certificateRouter = require("./routes/Certificate.routes");
const contectdetailsRouter = require("./routes/ContectDetails.routes");
const newsHeadingRouter = require("./routes/NewsHeading.routes");
const homebannerRouter = require("./routes/HomeBanner.routes");
// const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));

// all routes are used Below

app.use("/", categoryRouter);
app.use("/newsandevent", newsandeventsRouter);

app.use("/",networkRouter)
app.use("/",outletRouter)

app.use("/aboutus", aboutusRouter);
app.use("/certificate", certificateRouter);
app.use("/contect", contectdetailsRouter);
app.use("/newsheading", newsHeadingRouter);
app.use("/homebanner", homebannerRouter);



app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
});
