import jwt from "jsonwebtoken";
import { MESSAGES } from "../utils/messages/index.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: MESSAGES.ACCESS_DENIED});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded?.id;
    
    if (!req.userId) {
      return res.status(402).json({ message: MESSAGES.USER_UNVERIFIED });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: MESSAGES.REFRESH_TOKEN_EXPIRED });
  }
};