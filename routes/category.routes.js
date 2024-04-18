const express=require("express")
const categoryRouter=express.Router()
const categoryController=require("../controller/categoryController")
categoryRouter.get("/category",categoryController.getCategory)
categoryRouter.post("/category/add",categoryController.addCategory)

module.exports=categoryRouter