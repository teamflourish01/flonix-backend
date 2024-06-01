const { CategoryModel } = require("../model/CategoryModel")

exports.addCategory=async(req,res)=>{
    try {
        let exist=await CategoryModel.findOne({name:req.body.name})
        if(exist){
            res.status(400).send({
                msg:"Category already exists",
                exist,
               
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
    let {page}=req.query
    try {
        if(page){
            let data=await CategoryModel.find().skip((page-1)*12).limit(12)
            res.status(200).send({
                msg:"Category successfully retrieved",
                data
            })
        }else{
            let data=await CategoryModel.aggregate([{
                $lookup:{
                    from:"products",
                    localField:"_id",
                    foreignField:"category",
                    as:"products"
                }
            }])
            res.status(200).send({
                msg:"Category successfully retrieved",
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

exports.getSingleCategory=async(req,res)=>{
    let {slug}=req.params
    try {
        let data=await CategoryModel.findOne({slug})
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

exports.editCategory=async(req,res)=>{
    let {slug}=req.params
    
    try {
            let data=await CategoryModel.findOneAndUpdate({slug},req.body,{new:true})
            res.status(200).send({
                msg:"Category successfully Updated",
                data
            })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.deleteCategory=async(req,res)=>{
    let {slug}=req.params
    try {
        let data=await CategoryModel.findOneAndDelete({slug})
        let remaining=await CategoryModel.find({},{},{sort:{order:1}})
        
        for(let i=0;i<remaining.length;i++){
            remaining[i].order=i+1
            await remaining[i].save()
        }
        res.status(200).send({
            msg:"Category successfully Deleted",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.searchCategory=async(req,res)=>{
    let {search}=req.params
    try {
        
        let data=await CategoryModel.find({name: { $regex: `^${search}`, $options: 'i' } })
        res.status(200).send({
            msg:"Search category successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}