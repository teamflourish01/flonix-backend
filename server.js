const express = require("express");
const { connection } = require("./db");
require("dotenv").config("");
const cors = require("cors");
const categoryRouter = require("./routes/category.routes");

const ProductRouter = require("./routes/product.routes");
const { ProductImageRouter } = require("./middleware/ProductMiddleware");
const app=express()
app.use(cors({origin:true}))
app.use(express.json())
app.use(express.static("public"))


// all routes are used Below

app.use("/",categoryRouter)
app.use("/",ProductRouter)


// all image uploads routes
app.use("/",ProductImageRouter)


const newsandeventsRouter = require("./routes/NewsAndEvent.routes");
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("uploads"));

// all routes are used Below

app.use("/", categoryRouter);
app.use("/newsandevent", newsandeventsRouter);


app.listen(process.env.PORT, async () => {
  console.log(`Server is Listening on ${process.env.PORT}`);
  try {
    await connection;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
});
