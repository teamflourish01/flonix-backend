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
      require: true,
    },
    order: {
      type: Number,
      require: true,
    },
    slug:{
      type:String,
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

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = {
  CategoryModel,
};
