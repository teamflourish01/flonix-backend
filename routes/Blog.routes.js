const express=require("express");
const BlogRouter=express.Router()
const blogController=require("../controller/BlogController")

BlogRouter.get("/blog",blogController)