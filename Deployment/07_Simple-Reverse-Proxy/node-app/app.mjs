import express from "express";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Hello Im ExpressJs Server" });
});

app.listen(4000, () => {
    console.log("Server started running on port", 4000);
});
