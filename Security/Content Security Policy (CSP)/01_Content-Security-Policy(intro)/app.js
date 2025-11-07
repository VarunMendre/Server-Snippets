import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

await mongoose.connect(
  "mongodb://admin:admin@localhost/socialApp?authSource=admin"
);

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Middleware
app.use((req, res, next) => {
  if (req.headers.accept?.includes("text/html")) {
    // this header won't allow you to load any external, script, img, style sheet etc .
    //  res.setHeader("Content-Security-Policy","default-src 'self'");


    // res.setHeader(
    //   "Content-Security-Policy",
    //   "default-src 'self';\
    //    script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com http://localhost:8000/script.js;\
    //   img-src 'self' https://images.unsplash.com;\
    //   style-src 'unsafe-inline';\
    //   connect-src 'self' http://localhost:8000/"
    // );

    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self';\
       script-src 'self' https://*.tailwindcss.com ;\
      img-src 'self' https://images.unsplash.com;\
      style-src 'unsafe-inline';\
      connect-src 'self' "
    );
  }

  // Dont load anything just load HTML, rest all will fail
  // res.setHeader("Content-Security-Policy", "default-src 'none'");

  next();
});
app.use(express.static("./public"));

// Routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.setHeader("Set-Cookie", "loginSecret=hdxhw7yrx.k;");
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const post = new Post({ content });
  await post.save();
  res.status(201).json(post);
});

// Start server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
