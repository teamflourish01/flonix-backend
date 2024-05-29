const { BlogCategoryModel } = require("../model/BlogCategory")

exports.addCategory=async(req,res)=>{
    try {
        let exist=await BlogCategoryModel.findOne({$or:[{name:req.body.name},{slug:req.body.slug}]})
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
    if(page){
        let data=await BlogCategoryModel.find().skip((page-1)*12).limit(12)
        res.status(200).send({
            msg:"Category successfully retrieved",
            data
        })
    }else{
        let data=await BlogCategoryModel.find()
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

exports.getcategoryDetail=async(req,res)=>{
    let {slug}=req.params
    try {
        let data=await BlogCategoryModel.findOne({slug})
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
            let data=await BlogCategoryModel.findOneAndUpdate({slug},req.body,{new:true})
            res.status(200).send({
                msg:"Category successfully Updated",
                data
            })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.deleteCategory=async(req,res)=>{
    let {slug}=req.params
    try {
        let data=await BlogCategoryModel.findOneAndDelete({slug})
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
        let data=await BlogCategoryModel.find({name: { $regex: `^${search}`, $options: 'i' } })
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
