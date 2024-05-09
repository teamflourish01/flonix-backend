const mongoose=require("mongoose")
const options={
    versionKey: false,
    timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
    },
}
const BlogSchema=new mongoose.Schema({

},options)