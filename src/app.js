import express from "express";

import cors from "cors";
import authRoutes from "/home/jugal/Desktop/Node/MiniProject/routes/auth.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests



// Routes
app.use("/api/auth", authRoutes);


export {app}