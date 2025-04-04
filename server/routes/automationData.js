import express from "express";
import { handleAutomationData } from "../controllers/handleAutomationData.js"; // Ensure correct path

const router = express.Router();

router.post("/automationData", handleAutomationData);

export default router;  
