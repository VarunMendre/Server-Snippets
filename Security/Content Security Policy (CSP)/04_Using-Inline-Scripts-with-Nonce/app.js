import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import { readFile } from "fs/promises";

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

const nonce = crypto.randomBytes(16).toString("base64");


// eval, setTime , new Func 

// Middleware
app.use(async (req, res, next) => {
  if (req.headers.accept?.includes("text/html")) {

    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self';\
      script-src 'self' 'nonce-${nonce}' 'report-sample';\
      img-src 'self';\
      style-src 'self' 'nonce-${nonce}' ;\
      connect-src 'self';\
      report-uri /csp-violations` //gives all error means the report obj
    );
  }
  if (req.url === "/") {
    const indexHTML = await readFile("./public/index.html", 'utf-8');
    return res.send(indexHTML.replaceAll("${nonce}", nonce))
  }
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

// here we've to use an extra middleware to set the type of res,
// o/w req.body will empty

app.post(
  "/csp-violations",
  express.json({ type: "application/csp-report" }),
  (req, res) => {
    console.log(req.body);
    res.end("Check on Console for more details");
  }
);

// Start server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
