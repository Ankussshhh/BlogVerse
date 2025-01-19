const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images/"));
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + "-" + file.originalname;
    cb(null, fn);
  },
});

const upload = multer({ storage });

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", upload.single("profileImageUrl"), async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
    profileImageUrl: `/images/${req.file.filename}`,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/signout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.get("/profile/:id", async(req, res) => {
  const allBlogs = await Blog.find({createdBy : req.params.id}).populate("createdBy");
  const comments = await Comment.find({createdBy : req.params.id }).populate("createdBy");
  return res.render("myProfile", {
    user: req.user,
    blogs: allBlogs,
    comments,
  });
});

module.exports = router;
