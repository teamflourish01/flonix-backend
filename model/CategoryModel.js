const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
    slug:{
      type:String,
      unique: true,
      required: true,
    }
  },
  options
);

CategorySchema.pre("save", async function(next){
  try {
    if(this.isNew){
      const lastCategory = await CategoryModel.findOne({}, {}, { sort: {order:-1} });
      const lastOrder = lastCategory ? lastCategory.order : 0;
      this.order = lastOrder + 1;
      next();
    }
  } catch (error) {
    next(error);
  }
});

// CategorySchema.pre("findOneAndUpdate", async function(next,res){
//   try {
//     let update=this.getUpdate()
//     if(update){
//       console.log(update.name);
//       let exist=await CategoryModel.find({$or:[{name:update.name},{slug:update.slug}]})
//       console.log(exist);
//       for(let element of exist){
//         if(element._id.toString()!==update._id.toString()){
//           let error=new Error("Name And Slug Should be unique")
//           error.status=400
//           // console.log(error);
//           next(error)
//         }else{
//           continue;
//         }
//       }
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = {
  CategoryModel,
};
