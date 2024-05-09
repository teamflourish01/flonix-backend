const mongoose=require("mongoose")

const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };

const NetworkSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true
    }
},options)

const NetworkModel=mongoose.model("Network",NetworkSchema)

module.exports={NetworkModel}