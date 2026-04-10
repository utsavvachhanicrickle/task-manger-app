import jwt from "jsonwebtoken";
import { MESSAGES } from "./messages/index.js";

export const genrateRefreshToken = async ({ email, id }) => {
  return jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const genrateAccessToken = async ({ email, id }) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const verifyRefreshToken = async (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error(MESSAGES.REFRESH_TOKEN_EXPIRED);
  }
};
