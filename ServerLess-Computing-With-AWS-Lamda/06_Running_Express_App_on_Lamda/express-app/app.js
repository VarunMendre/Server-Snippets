import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Express App");
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express" });
});

app.post("/data", (req, res) => {
  res.json({
    message: "Data received successfully",
    body: req.body,
  });
});


export default app;
