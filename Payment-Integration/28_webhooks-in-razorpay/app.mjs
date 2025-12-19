import express from "express";
import crypto from "crypto";

const app = express();
const PORT = 4000;

app.use(express.json());

const secret = "1234567890qwertyuiop";

app.get("/", (req, res) => {
  res.json({message : "Hello, World!!!"});
});

app.post("/razorpay-webhook", (req, res) => {
    const rzpSignature = req.headers['x-razorpay-signature'];
    console.log("Signature:", rzpSignature);

    const mySignature = crypto.createHmac("sha256", secret).update(JSON.stringify(req.body)).digest("hex");
    console.log("My Signature:", mySignature);

    if (rzpSignature === mySignature) {
      console.log("Request is legit");
      console.log(req.body);
      console.log(req.body.payload);
      return res.json({ status: "success" });
    } else {
        console.log("Request is not legit");
        return res.json({ status: "failure" });
    }

    return res.json({ message: "Razorpay Webhook Endpoint Not Validate" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
