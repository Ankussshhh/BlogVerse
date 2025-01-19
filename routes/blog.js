const { Router } = require("express");
const router = Router();
const path = require("path");
const Blog = require("../models/blog");
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
  return res.render("viewBlog", {
    user: req.user,
    blog,
  });
});

module.exports = router;
