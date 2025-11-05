import express from "express";
import { pool } from "./db.js";


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("PostgreSQL + Express API is running");
});

app.post("/register-vuln", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // WARNING: vulnerable to SQL injection
    const insertQuery = `
      INSERT INTO users (name, email, password)
      VALUES ('${name}', '${email}', '${password}')
      RETURNING id, name, email;
    `;
    const { rows } = await pool.query(insertQuery);
    return res.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});


// While Login use this : { "email": "x' OR 1=1 -- ", "password": "1234" } for SQL injection

// Login (vulnerable)
app.post('/login-vuln', async (req, res) => {
  const { email, password } = req.body;
  try {
    // WARNING: vulnerable to SQL injection
    const selectQuery = `
      SELECT id, name, email FROM users
      WHERE email = '${email}' AND password = '${password}'
      LIMIT 1;
    `;
    const { rows } = await pool.query(selectQuery);
    if (rows.length === 0) return res.status(401).json({ ok: false, msg: 'Invalid credentials' });
    return res.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Express Server Started Listening on 5000");
})