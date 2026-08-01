import express from "express";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hey I'm Docker 🐳, You're running nodejs container!" });
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
