const express=require("express")
const categoryRouter=express.Router()
const categoryController=require("../controller/categoryController")
categoryRouter.get("/category",categoryController.getCategory)
categoryRouter.post("/category/add",categoryController.addCategory)
categoryRouter.get("/category/:slug",categoryController.getSingleCategory)
categoryRouter.post("/category/edit/:slug",categoryController.editCategory)
categoryRouter.delete("/category/delete/:slug",categoryController.deleteCategory)
categoryRouter.get("/category/search/:search",categoryController.searchCategory)
module.exports=categoryRouter

