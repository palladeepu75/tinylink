import express from "express";
import dotenv from "dotenv";
dotenv.config();
import apiRoutes from "./routes/api.js";
import pageRoutes from "./routes/pages.js";
import { initDB } from "./db.js";

const app = express();

// MUST be before view engine setup



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Routes
app.use("/api", apiRoutes);
app.use("/", pageRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB INITIALIZATION ERROR:", err);
    process.exit(1);
  });
