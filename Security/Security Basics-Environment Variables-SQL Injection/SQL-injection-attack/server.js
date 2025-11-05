import express from "express";
import { pool } from "./db.js";

import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("PostgreSQL + Express API is running");
});

const SALT_ROUNDS = 10;

// Register - safe: hash password and use parameterized query
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const insertQuery = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
    const { rows } = await pool.query(insertQuery, [name, email, hashed]);
    return res.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// Login - safe: parameterized SELECT, compare hashed password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Parameterized query prevents injection
    const selectQuery = `SELECT id, name, email, password FROM users WHERE email = $1 LIMIT 1`;
    const { rows } = await pool.query(selectQuery, [email]);

    if (rows.length === 0)
      return res.status(401).json({ ok: false, msg: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ ok: false, msg: "Invalid credentials" });

    // remove password before returning
    delete user.password;
    return res.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Express Server Started Listening on 5000");
})