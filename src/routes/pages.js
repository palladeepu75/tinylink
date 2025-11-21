import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Dashboard
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM links ORDER BY code ASC");
  res.render("dashboard", { links: result.rows });
});

// Stats page
router.get("/code/:code", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM links WHERE code=$1",
    [req.params.code]
  );
  if (result.rowCount === 0) return res.status(404).send("Not found");
  res.render("stats", { link: result.rows[0] });
});

// Redirect
router.get("/:code", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM links WHERE code=$1",
    [req.params.code]
  );
  if (result.rowCount === 0) return res.status(404).send("Not found");

  const link = result.rows[0];

  await pool.query(
    "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1",
    [req.params.code]
  );

  res.redirect(302, link.url);
});

export default router;
