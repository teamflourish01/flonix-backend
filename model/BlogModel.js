const mongoose=require("mongoose")
const options={
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
}
const BlogSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    banner_image:{
        type:String
    },
    
},options)