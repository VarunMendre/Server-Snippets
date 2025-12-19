import express from "express";
import courses from "./courses.json" with { type: "json" };
import ordersJson from "./orders.json" with { type: "json" };

import Razorpay from "razorpay";
import cors from "cors";
import { writeFile } from "node:fs/promises";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const instance = new Razorpay({
  key_id: process.env.RZP_TEST_KEY_ID,
  key_secret: process.env.RZP_TEST_CLIENT_SECRET,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json(courses);
});

app.post("/create-order", async (req, res) => {
  const { id } = req.body;

 
  const { price, name} = courses.find((course) => course.id === id);

  const order = await instance.orders.create({
    amount: price * 100,
    currency: "INR",
    notes: {
      courseId: id,
      courseName: name,
    },
  });

  console.log(req.body);
  return res.status(201).json({ orderId: order.id });
});

app.post("/complete-order", async (req, res) => {
  const { orderId, courseId, courseName, userName, userContact } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Order id is missing" });
  }

  const checkOrder = await instance.orders.fetch(orderId);

  console.log(checkOrder);
  if (!checkOrder) {
    return res.status(400).json({ error: "Order Id is not valid !" });
  }

  if (checkOrder.status === "paid") {
    ordersJson.push({
      orderId,
      courseId,
      courseName,
      userName,
      userContact,
      orderStatus: "paid"
    });

    await writeFile('./orders.json', JSON.stringify(ordersJson, null, 2))
    return res
      .status(201)
      .json({ message: "Order has been paid successfully", status: "success" });
  }

  return res
    .status(400)
    .json({ error: "Order created, but might attempted", status: "failed" });
});

app.listen(4000, () => {
  console.log("Server started");
});
