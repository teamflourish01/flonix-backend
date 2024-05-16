const express = require("express");
const BlogRouter = express.Router();
const blogController = require("../controller/BlogController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/blog");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only JPG images are allowed"), false);
  }
};

const uploadBlog = multer({
  storage: storage,
  fileFilter,
});

BlogRouter.post(
  "/blog/add",
  uploadBlog.fields([
    {
      name: "banner",
    },
    { name: "first" },
    { name: "second" },
    { name: "third" },
  ]),
  blogController.addBlog
);

BlogRouter.get("/blog",blogController.getBlog)
BlogRouter.get("/blog/:id",blogController.getDetailBlog)
BlogRouter.delete("/blog/delete/:id",blogController.deleteBlog)
module.exports = { BlogRouter };
