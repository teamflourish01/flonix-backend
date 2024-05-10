const { NetworkModel } = require("../model/NetworkModel")

exports.addNetwork=async(req,res)=>{

    try {
        let exist=await NetworkModel.find()
        if(exist.length>0){
            res.status(400).send({
                msg:"Network already exists",
                exist
            })
        }else{
            let data=await NetworkModel(req.body)
            await data.save()
            res.status(200).send({
                msg:"Network successfully Added",
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

exports.getNetwork=async(req,res)=>{
    try {
        let data=await NetworkModel.find()
        res.status(200).send({
            msg:"Product successfully retrieved",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}

exports.editNetwork=async(req,res)=>{
    let {id}=req.params
    console.log(req.body);
    try {
        let data=await NetworkModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            msg:"Product successfully updated",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
}


