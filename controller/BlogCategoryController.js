const { BlogCategoryModel } = require("../model/BlogCategory")
const { blogCategoryRouter } = require("../routes/Blog.routes")

exports.addCategory=async(req,res)=>{
    try {
        let exist=await BlogCategoryModel.findOne({name:req.body.name})
        if(exist){
            res.status(400).send({
                msg:"Category already exists",
                exist,
            })
        }else{
            let data=await BlogCategoryModel(req.body)
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
        let data=await BlogCategoryModel.find().skip((page-1)*12).limit(12)
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
        let exist=await BlogCategoryModel.findOne({name})
        if(exist){
        res.status(404).send({
            msg:"Category Name Already Taken",
            exist})
        }
        else{
            let data=await BlogCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
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
        let data=await BlogCategoryModel.findByIdAndDelete(id)

        let remaining=await blogCategoryRouter.find({},{},{sort:{order:1}})
        
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