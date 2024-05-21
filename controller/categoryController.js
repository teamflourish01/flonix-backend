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
    let {id}=req.params
    try {
        let data=await CategoryModel.findById(id)
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
    let {id}=req.params
    let {name}=req.body
    try {
        let exist=await CategoryModel.findOne({name})
        if(exist){
        res.status(404).send({
            msg:"Category Name Already Taken",
            exist})
        }
        else{
            let data=await CategoryModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).send({
                msg:"Category successfully Updated",
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

exports.deleteCategory=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await CategoryModel.findByIdAndDelete(id)

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