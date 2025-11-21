import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS links (
      code VARCHAR(10) PRIMARY KEY,
      url TEXT NOT NULL,
      clicks INT DEFAULT 0,
      last_clicked TIMESTAMP
    );
  `);
}


