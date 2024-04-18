const { CategoryModel } = require("../model/CategoryModel")

exports.addCategory=async(req,res)=>{
    try {
        let exist=await CategoryModel.findOne({name:req.body.name})
        if(exist){
            res.status(400).send({
                msg:"Category already exists",
                exist
            })
        }else{
            let data=await CategoryModel(req.body)
            await data.save()
            res.status(200).send({
                msg:"Category successfully Added",
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

exports.getCategory=async(req,res)=>{
    try {
        let data=await CategoryModel.find()
        res.status(200).send({
            msg:"Category successfully retrieved",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}