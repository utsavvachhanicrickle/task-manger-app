import AppError from "../utils/AppError.js";
import { MESSAGES } from "../utils/messages/index.js";


export const ProjectValidation = {
  notExistesData: (data) => {
    const { title, desc } = data;
    if (!title || !desc) {
      throw new AppError(MESSAGES.DATA_NOT_EXISTES, 400);
    }
  },
  projectExists: (existingProject) => {
    if (!existingProject) throw new AppError(MESSAGES.PROJECT_NOT_EXISTS);
  },
};
