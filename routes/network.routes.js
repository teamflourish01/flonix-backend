const express=require("express")
const networkRouter=express.Router()
const networkController=require("../controller/networkController")

networkRouter.get("/contact",networkController.getNetwork)
networkRouter.post("/contact/add",networkController.addNetwork)
networkRouter.post("/contact/edit/:id",networkController.editNetwork)

module.exports={
    networkRouter
}