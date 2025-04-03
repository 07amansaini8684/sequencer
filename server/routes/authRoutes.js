import { Router } from "express";
import User from "../model/User";
import { authCallback } from "../controllers/authController";

const router = Router();

router.post("/callback", authCallback);

export default router;
