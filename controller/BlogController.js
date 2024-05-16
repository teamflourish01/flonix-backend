const { BlogModel } = require("../model/BlogModel");

exports.addBlog = async (req, res) => {
  let dup = JSON.parse(req.body.dup);
  if(req.files.first){
    dup.first_image=req.files.first[0].filename
  }
  if(req.files.banner){
    dup.banner_image=req.files.banner[0].filename
  }
  if(req.files.second){
    dup.second_image=req.files.second[0].filename
  }
  if(req.files.third){
    dup.third_image=req.files.third[0].filename
  }

  try {
    let { name } = req.body;

    let exist = await BlogModel.findOne({ name });
    if (exist) {
      res.status(400).send({
        exist,
        msg: "Blog already exists",
      });
    } else {
      let data = await BlogModel({
        ...dup
      });
      await data.save();
      res.status(200).send({
        msg: "Blog successfully Added",
        data,
      });
    }
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    let data = await BlogModel.find().populate("category");
    res.status(200).send({
      msg: "Blog Retrived Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.getDetailBlog=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await BlogModel.findById(id)
        res.status(200).send({
            msg:"Data retrieved successfully",
            data
        })
    } catch (error) {
        res.status(404).send({
            msg: error.message,
            error,
          });
    }
}

exports.editBlog = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({
      msg: "Blog Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await BlogModel.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Blog Deleted Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.searchBlog = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await BlogModel.find({
      name: { $regex: `^${search}`, $options: `i` },
    });
    res.status(200).send({
      msg: "Blog Found Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};
