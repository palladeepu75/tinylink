import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// POST /api/links
router.post("/links", async (req, res) => {
  const { url, code } = req.body;

  if (!url || !code)
    return res.status(400).json({ error: "Missing url or code" });

  if (!/^[A-Za-z0-9]{6,8}$/.test(code))
    return res.status(400).json({ error: "Invalid code format" });

  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    await pool.query(
      "INSERT INTO links (code, url) VALUES ($1, $2)",
      [code, url]
    );
    return res.status(201).json({ ok: true });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Code already exists" });
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/links
router.get("/links", async (req, res) => {
  const result = await pool.query("SELECT * FROM links ORDER BY code ASC");
  res.json(result.rows);
});

// GET /api/links/:code
router.get("/links/:code", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM links WHERE code=$1",
    [req.params.code]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ error: "Not found" });
  res.json(result.rows[0]);
});

// DELETE /api/links/:code
router.delete("/links/:code", async (req, res) => {
  const result = await pool.query(
    "DELETE FROM links WHERE code=$1",
    [req.params.code]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
