const express=require("express")
const ProductRouter=express.Router()
const productController=require("../controller/productController")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/product");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only PNG images are allowed"), false);
  }
};

const uploadProduct = multer({
  storage: storage,
  fileFilter,
});


ProductRouter.get("/product",productController.getProduct)
ProductRouter.post("/product/add",productController.addProduct)
ProductRouter.get("/product/search/:search",productController.searchProduct)
ProductRouter.delete("/product/delete/:slug",productController.deleteProduct)
ProductRouter.get("/product/:slug",productController.getDetailProduct)
ProductRouter.post("/product/edit/:slug",uploadProduct.fields([{name:"product"},{name:"marks"}]),productController.editProduct)

module.exports=ProductRouter