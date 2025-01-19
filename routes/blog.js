const { Router } = require("express");
const router = Router();
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + "-" + file.originalname;
    cb(null, fn);
  },
});

const upload = multer({ storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId : req.params.id }).populate("createdBy");
  return res.render("viewBlog", {
    user: req.user,
    blog,
    comments,
  });
});

router.get("/delete/blog/:id", async (req, res) => {
  await Blog.deleteOne({_id : req.params.id});
  return res.redirect(`/user/profile/${req.user._id}`);
});

router.get("/delete/comment/:id", async (req, res) => {
  await Comment.deleteOne({_id : req.params.id});
  return res.redirect(`/user/profile/${req.user._id}`);
});

router.post("/comment/:blogId", async(req,res) => {
  await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    createdBy : req.user._id,
  })
  return res.redirect(`/blog/${req.params.blogId}`);
})

module.exports = router;