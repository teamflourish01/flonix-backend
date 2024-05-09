const express = require("express");
const ProductImageRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/product");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only PNG images are allowed"), false);
  }
};

const uploadProduct = multer({
  storage: storage,
  fileFilter,
});

ProductImageRouter.post(
  "/product/image",
  uploadProduct.array("product"),
  async (req, res) => {
    try {
        let arr=[]
        let files=req.files
        for (let file of files){
            arr.push(file.filename)
        }
        res.status(200).send({
            msg:"Product Image Added successfully",
            data:arr
        })
    } catch (error) {
        res.status(400).send({
            msg:error.message,
            error
        })
    }
  }
);


module.exports={ProductImageRouter}