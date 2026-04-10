import { MESSAGES } from "../messages/index.js";
import AppError from "../AppError.js";

export const AuthValidation = {
  userExistes: (userId) => {
    if (!userId) throw new AppError(MESSAGES.USER_UNVERIFIED, 401);
  },
  userNotExistes: (existingUser) => {
    if (!existingUser) throw new AppError(MESSAGES.USER_NOT_EXISTS, 404);
  },
  userAlrady: (existingUser) => {
    if (existingUser) throw new AppError(MESSAGES.USER_ALREADY_EXISTS, 400);
  },
  passwordChecking: (password, confirmPassword) => {
    if (password !== confirmPassword)
      throw new AppError(MESSAGES.PASSWORD_NOT_MATCH, 400);
  },
  notExistesData: (data) => {
    const { email, password, confirmPassword, firstName, lastName } = data;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      throw new AppError(MESSAGES.DATA_NOT_EXISTES, 400);
    }
  },
};
