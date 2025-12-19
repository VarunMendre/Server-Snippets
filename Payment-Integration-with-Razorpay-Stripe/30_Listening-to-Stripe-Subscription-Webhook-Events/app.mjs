import express from "express";
import { writeFile } from "fs/promises";

const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
    console.log(req.body);
    writeFile("webhook-data.json", JSON.stringify(req.body, null, 2));
  res.json({ message: "Webhook received" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
