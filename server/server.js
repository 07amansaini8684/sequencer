import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
// Pass no parameters
app.use(clerkMiddleware())
// Middleware


// Connect to MongoDB
connectDB();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// MongoDB Connection

// Basic API Route
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
