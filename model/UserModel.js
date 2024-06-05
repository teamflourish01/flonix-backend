const mongoose=require("mongoose")
const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  };
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
    },
    image:{
        type:String
    }
},options)

const UserModel=mongoose.model("User",UserSchema)
module.exports={
    UserModel
}