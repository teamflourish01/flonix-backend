const express = require("express");
const { connection } = require("./db");
require("dotenv").config("");
const app=express()
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");

const ProductRouter = require("./routes/product.routes");
const { ProductImageRouter } = require("./middleware/ProductMiddleware");
app.use(cors({origin:true}))
app.use(express.json())
app.use(express.static("public"))


// all routes are used Below

app.use("/",categoryRouter)
app.use("/",ProductRouter)


// all image uploads routes
app.use("/",ProductImageRouter)


const newsandeventsRouter = require("./routes/NewsAndEvent.routes");
const { networkRouter } = require("./routes/network.routes");
const { outletRouter } = require("./routes/outlet.routes");
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));

// all routes are used Below

app.use("/", categoryRouter);
app.use("/newsandevent", newsandeventsRouter);
app.use("/",networkRouter)
app.use("/",outletRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
});
