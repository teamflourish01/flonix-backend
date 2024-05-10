const ProductModel = require("../model/ProductModel");

exports.getProduct = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await ProductModel.find()
        .skip((page - 1) * 12)
        .limit(12)
        .populate("category");

      res.status(200).send({
        msg: "Product retrieved successfully",
        data,
      });
    } else {
      let data = await ProductModel.find().populate("category");
      res.status(200).send({
        msg: "Product retrieved successfully",
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addProduct = async (req, res) => {
  let { name } = req.body;
  try {
    let exist = await ProductModel.findOne({ name });
    if (exist) {
      res.status(400).send({
        msg: "Product already exists",
        exist,
      });
    } else {
      let data = await ProductModel(req.body);
      await data.save();
      res.status(200).send({
        msg: "Product saved successfully",
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.searchProduct = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await ProductModel.find({
      name: { $regex: `^${search}`, $options: `i` },
    }).populate("category");
    res.status(200).send({
      msg: "Searched Product Retrived",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ProductModel.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Product deleted successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.getDetailProduct = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ProductModel.findById(id).populate("category");
    res.status(200).send({
      msg: "Single Product Retrived",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.editProduct = async (req, res) => {
  let { id } = req.params;
  try {
    console.log("body data", JSON.parse(req.body.dup));
    let dup = JSON.parse(req.body.dup);
    let files = req.files;
    console.log(files, "files");
    let product = files.product?.map((e) => e.filename);
    let marks = files.marks?.map((e) => e.filename);
    if(product){
      dup.image=[...dup.image,...product]
    }
    if(marks){
      dup.mark=[...dup.mark,...marks]
    }
    console.log("product", product);
    console.log("mark", marks);
    let data = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...dup
      },
      { new: true }
    );
    console.log(data);
    res.status(200).send({
      msg: "Product updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
