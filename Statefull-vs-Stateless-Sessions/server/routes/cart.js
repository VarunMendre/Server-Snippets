import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const session = await Session.findById(sessionId).populate(
    "data.cart.courseId"
  );
  const courseIds = session.data.cart.map(({ courseId }) => courseId);

  if (!session.userId) {
    const cartCourses = session.data.cart.map(({ courseId, quantity }) => {
      const { id, name, image, price } = courseId;
      return { id, name, image, price, quantity };
    });

    return res.json(cartCourses);
  }
  
  const data = await Cart.findOne({ userId: session.userId }).populate("courses.courseId");
  
  if (!data) {
    return res.status(404).json({ message: "Cart not found for this session" });
  }

  const cartCourses = data.courses.map(({ courseId, quantity }) => {
    const { id, name, image, price } = courseId;
    return { id, name, image, price, quantity };
  });

  return res.json(cartCourses);

});

// Add to cart
router.post("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.body.courseId;

  const session = await Session.findById(sessionId);
  if (session.userId) {


    const result = await Cart.updateOne(
      {
        userId: session.userId,
        "courses.courseId": courseId,
      },
      {
        $inc: { "courses.$.quantity": 1 },
      }
    );

    if (result.matchedCount === 0) {
      await Cart.updateOne(
        { userId: session.userId },
        {
          $push: {
            "courses": { courseId, quantity: 1 },
          },
        }
      );
    }

    return res.status(201).json({ message: "Course added to the cart" });
  }

  res.status(201).json({ message: "Course added to the cart" });
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.params.courseId;

  const result = await Session.updateOne(
    { _id: sessionId },
    { $pull: { "data.cart": { courseId } } }
  );

  console.log(result);
  res.json({ message: "Cart item deleted" });
});

export default router;
