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

// Read origins from .env and split by comma
const allowedOrigins = process.env.ORIGIN?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools (like curl/postman)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
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
