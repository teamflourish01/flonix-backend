const express=require("express")
const blogCategoryRouter=express.Router()
const blogCategoryController=require("../controller/BlogCategoryController")

blogCategoryRouter.get("/blogcategory",blogCategoryController.getCategory)
blogCategoryRouter.post("/blogcategory/add",blogCategoryController.addCategory)
blogCategoryRouter.post("/blogcategory/edit/:id",blogCategoryController.editCategory)
blogCategoryRouter.delete("/blogcategory/delete/:id",blogCategoryController.deleteCategory)

module.exports={blogCategoryRouter}