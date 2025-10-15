require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const Blog = require("./models/Blog");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Blog backend server running ");
});

// ---------------- AUTH ----------------

// signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Fill all fields" });

    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });
    res.json({ msg: "Signup done " });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// signin
app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// ---------------- BLOG CRUD ----------------

// get all blogs
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// add new blog (only for logged-in)
app.post("/blogs", auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ msg: "Missing fields" });

  const blog = await Blog.create({ title, description });
  res.json(blog);
});

// update blog
app.put("/blogs/:id", auth, async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!blog) return res.status(404).json({ msg: "Not found" });
  res.json(blog);
});

// delete blog
app.delete("/blogs/:id", auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted " });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
