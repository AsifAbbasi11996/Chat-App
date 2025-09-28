import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./database/db.js";
import { app, server } from "./lib/socket.js";
import appRouter from "./routes/index.route.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Health check route
app.get("/api", (req, res) => {
  res.status(200).json({ message: "✅ Backend server is running!" });
});

app.use("/api", appRouter);

// 🚀 No frontend serving – frontend is on separate Vercel deployment

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
