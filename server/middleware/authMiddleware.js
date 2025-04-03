import { clerkClient } from '@clerk/express'

export const protectRotues = async (req, res, next) => {
   if(!req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized" });
   }
   next();
}

