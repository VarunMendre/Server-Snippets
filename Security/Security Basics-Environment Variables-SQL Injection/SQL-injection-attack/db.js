import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

(async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL Connected Successfully");
        client.release();
    } catch (err) {
        console.log("PostgreSql Connection Error");
    }
})();

