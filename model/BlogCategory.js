const mongoose=require("mongoose")
const options={
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
}
const BlogCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
},options)

const BlogCategoryModel=mongoose.model("BlogCategory",BlogCategorySchema)
module.exports={
    BlogCategoryModel
}