const express=require("express")
const outletRouter=express.Router()
const outletController=require("../controller/outletController")

outletRouter.get("/outlet",outletController.getOutlet)
outletRouter.post("/outlet/add",outletController.addOutlet)
outletRouter.post("/outlet/edit/:id",outletController.editOutlet)
outletRouter.delete("/outlet/delete/:id",outletController.deleteOutlet)
outletRouter.get("/outlet/search/:search",outletController.searchOutlet)
outletRouter.get("/outlet/:id",outletController.getOutletDetail)
module.exports={outletRouter}