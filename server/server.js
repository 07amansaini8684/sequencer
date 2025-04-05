import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import automationData from "./routes/automationData.js"
import defineSendEmailJob, { defineAutomationJob }  from "./jobs/sendEmailJob.js";
import agenda from "./config/agenda.js";
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
// Pass no parameters
app.use(clerkMiddleware())
// Middleware

const startApp = async () => {
  await connectDB(); // Ensure DB is connected
  // defineAutomationJob

  // it is just for testing puposees
  // defineSendEmailJob(agenda); // Register job definition
  defineAutomationJob(agenda); // Register job definition
  await agenda.start(); // Start Agenda
  // console.log("🚀 Agenda started and ready");

  // // 🧪 Test: Schedule an email job in 2 minutes
  // await agenda.schedule("in 2 minutes", "send-email", { 
  //   email: "test@example.com",
  //   subject: "Test Email",
  //   message: "Hello! This is a test email.",
  //   language: "en",
  //   attachments: [],
  // });

  // console.log("📅 Email job scheduled in 2 minutes");
};

startApp();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// MongoDB Connection

// Basic API Route
app.use("/api/users", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/automation", automationData )

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  }
  );
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
