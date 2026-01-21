import redisClient from "./redis.js";
import crypto from "crypto";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/getCache", async (req, res) => {
  const { name, email, age, picture } = req.body;

  // deterministic cache key
  const usrHashId = crypto.createHash("sha256").update(email).digest("hex");

  const cacheKey = `cachedUser:${usrHashId}`;

  try {
    const cachedUser = await redisClient.hGetAll(cacheKey);

    if (Object.keys(cachedUser).length > 0) {
      return res.status(200).json({
        message: "User data fetched from cache",
        data: cachedUser,
      });
    }

    await redisClient.hSet(cacheKey, {
      username: name,
      email,
      age,
      profile_picture: picture,
    });

    return res.status(200).json({
      message: "User data not found but cached successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
