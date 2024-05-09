const mongoose=require("mongoose");
const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };

const outletSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String
    },
    address_url:{
        type:String
    },
    mobile:{
        type:String
    }
},options)

const OutletModel=mongoose.model("Outlet",outletSchema)
module.exports={
    OutletModel
}
