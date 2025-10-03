import express from "express";

import { scrapeMyntra } from "./scraper.js"; // import scraper

import path from "path";


import cors from "cors";
import authRoutes from "/home/jugal/Desktop/Node/MiniProject/routes/auth.routes.js";

const app = express();



// app.js



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend from backend
app.use(express.static(path.join(process.cwd(), "Frontend"))); // your folder name

// Scraper API
app.post("/search", async (req, res) => {
  const { productName } = req.body;
  if (!productName) return res.status(400).json({ error: "Product name required" });

  const results = await scrapeMyntra(productName);
  res.json(results);
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "Frontend/index.html"));
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));





// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests



// Routes
app.use("/api/auth", authRoutes);


export {app}