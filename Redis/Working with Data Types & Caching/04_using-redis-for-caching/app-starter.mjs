import express from "express";
import fetch from "node-fetch"; // ✅ Add this if you’re using Node < 18
import redisClient from "./redis.js";

const app = express();
app.use(express.json()); // ✅ Needed to parse JSON request bodies

// GET user (cache read)
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const redisKey = `user:${userId}`;

  // Try to fetch from Redis
  const cachedUser = await redisClient.get(redisKey); // ✅ using plain .get() instead of json.get()
  if (cachedUser) {
    console.log("✅ Serving from Redis cache");
    return res.json(JSON.parse(cachedUser));
  }

  // Fetch from API
  const userData = await getUser(userId);

  // Store in Redis
  await redisClient.set(redisKey, JSON.stringify(userData));
  await redisClient.expire(redisKey, 60 * 60 * 24); // expires in 24 hours

  console.log("🆕 Fetched from API & cached in Redis");
  res.json(userData);
});

// PUT user (update + delete cache)
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const redisKey = `user:${userId}`; // ✅ FIXED (was user:${userData} before ❌)

  // Update on API or DB
  const updatedUser = await updateUser(userId, userData);

  // Delete cache entry (since data is now outdated)
  await redisClient.del(redisKey);

  console.log("🗑️ Cache invalidated for key:", redisKey);
  res.json(updatedUser);
});

app.listen(4000, () => {
  console.log("Server started on 4000");
});

// ------------------------------
// Utility functions
// ------------------------------
async function getUser(userId) {
  const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
  return await response.json();
}

async function updateUser(userId, userData) {
  const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await response.json();
}
