const express=require("express")
const blogCategoryRouter=express.Router()
const blogCategoryController=require("../controller/BlogCategoryController")

blogCategoryRouter.get("/blogcategory",blogCategoryController.getCategory)
blogCategoryRouter.post("/blogcategory/add",blogCategoryController.addCategory)
blogCategoryRouter.get("/blogcategory/:slug",blogCategoryController.getcategoryDetail)
blogCategoryRouter.post("/blogcategory/edit/:slug",blogCategoryController.editCategory)
blogCategoryRouter.delete("/blogcategory/delete/:slug",blogCategoryController.deleteCategory)
blogCategoryRouter.get("/blogcategory/search/:search",blogCategoryController.searchCategory)

module.exports={blogCategoryRouter}