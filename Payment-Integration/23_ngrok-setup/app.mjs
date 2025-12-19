import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send({message :"Hello, World!,I'm Varun"});
}); 

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

