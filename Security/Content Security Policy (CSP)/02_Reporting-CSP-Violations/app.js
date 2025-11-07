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
    // report-sample gives 40 character of that script
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self';\
       script-src 'self' 'report-sample' https://*.tailwindcss.com ;\
      img-src 'self' https://images.unsplash.com;\
      style-src 'unsafe-inline';\
      connect-src 'self';\
      report-uri /csp-violations" //gives all error
    );
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
