const express=require("express")
const categoryRouter=express.Router()
const categoryController=require("../controller/categoryController")
categoryRouter.get("/category",categoryController.getCategory)
categoryRouter.post("/category/add",categoryController.addCategory)
categoryRouter.get("/category/:id",categoryController.getSingleCategory)
categoryRouter.post("/category/edit/:id",categoryController.editCategory)
categoryRouter.delete("/category/delete/:id",categoryController.deleteCategory)
categoryRouter.get("/category/search/:search",categoryController.searchCategory)
module.exports=categoryRouter

