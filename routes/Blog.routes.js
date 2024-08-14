const express = require("express");
const BlogRouter = express.Router();
const blogController = require("../controller/BlogController");
const multer = require("multer");
const SetImgsize = require("../middleware/ImagesizeMiddleware");

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
// Image Size Validation
const dimensions = {
  banner: { width: 651, height: 612 },
  first: { width: 849, height: 425 },
  second: { width: 849, height: 425 },
  third: { width: 849, height: 425 },
};

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
  SetImgsize(dimensions),
  blogController.addBlog
);

BlogRouter.get("/blog", blogController.getBlog);
BlogRouter.post(
  "/blog/edit/:slug",
  uploadBlog.fields([
    {
      name: "banner",
    },
    { name: "first" },
    { name: "second" },
    { name: "third" },
  ]),
  SetImgsize(dimensions),
  blogController.editBlog
);
BlogRouter.get("/blog/:slug", blogController.getDetailBlog);
BlogRouter.get("/blog/search/:search", blogController.searchBlog);
BlogRouter.delete("/blog/delete/:slug", blogController.deleteBlog);
module.exports = { BlogRouter };
