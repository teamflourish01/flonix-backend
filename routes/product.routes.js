const express=require("express")
const ProductRouter=express.Router()
const productController=require("../controller/productController")



ProductRouter.get("/product",productController.getProduct)
ProductRouter.post("/product/add",productController.addProduct)
ProductRouter.get("/product/search/:search",productController.searchProduct)
ProductRouter.delete("/product/delete/:id",productController.deleteProduct)
ProductRouter.get("/product/:id",productController.getDetailProduct)

module.exports=ProductRouter