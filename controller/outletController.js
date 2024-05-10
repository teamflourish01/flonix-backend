const { OutletModel } = require("../model/outletModel")

exports.addOutlet=async(req,res)=>{
    let {name}=req.body
    try {
        let exist=await OutletModel.findOne({name})
        if(exist){
           res.status(400).send({
            msg:"Already exists",
            exist
           }) 
        }else{
            let data=await OutletModel(req.body)
            await data.save()
            res.status(200).send({
                msg:"New Outlet Added",
                data
            })
        }
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.getOutlet=async(req,res)=>{
    let {page}=req.query
    try {
        if(page){
            let data=await OutletModel.find().skip((page-1)*12).limit(12)
            res.status(200).send({
                msg:"Data retrived Successfully",
                data
            })
        }else{
            let data=await OutletModel.find()
            res.status(200).send({
                msg:"Data retrived Successfully",
                data
            })
        }
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.getOutletDetail=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await OutletModel.findById(id)
        res.status(200).send({
            msg:"Data retrived Successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.editOutlet=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await OutletModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            msg:"Data updated successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.deleteOutlet=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await OutletModel.findByIdAndDelete(id)
        res.status(200).send({
            msg:"Data deleted successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.searchOutlet=async(req,res)=>{
    let {search}=req.params
    try {
        let data=await OutletModel.find({name:{$regex:`^${search}`,$options:`i`}})
        res.status(200).send({
            msg:"Data Retrived Successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}