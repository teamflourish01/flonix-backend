const { BlogModel } = require("../model/BlogModel")

exports.addBlog=async(req,res)=>{
    let {name}=req.body
    try {
        let exist=await BlogModel.findOne({name}) 
        if(exist){
            res.status(400).send({
                exist,
                msg:"Blog already exists"
            })
        }else{
            let data=await BlogModel(req.body)
            await data.save()
            res.status(200).send({
                msg:"Blog successfully Added",
                data
            })
        }
    } catch (error) {
        res.status(404).send({
            msg:error.message,
            error,
        })
    }
}

exports.getBlog=async(req,res)=>{
    try {
        let data=await BlogModel.find()
        res.status(200).send({
            msg:"Blog Retrived Successfully",
            data
        })
    } catch (error) {
        res.status(404).send({
            msg:error.message,
            error,
        })
    }
}

exports.editBlog=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await BlogModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            msg:"Blog Updated Successfully",
            data
        })
    } catch (error) {
        res.status(404).send({
            msg:error.message,
            error,
        })
    }
}

exports.deleteBlog=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await BlogModel.findByIdAndDelete(id)
        res.status(200).send({
            msg:"Blog Deleted Successfully",
            data
        })
    } catch (error) {
        res.status(404).send({
            msg:error.message,
            error,
        })
    }
}

exports.searchBlog=async(req,res)=>{
    let {search}=req.params
    try {
        let data=await BlogModel.find({name:{$regex:`^${search}`,$options:`i`}})
        res.status(200).send({
            msg:"Blog Found Successfully",
            data
        })
    } catch (error) {
        res.status(404).send({
            msg:error.message,
            error,
        })
    }
}