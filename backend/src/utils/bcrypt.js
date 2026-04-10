import bcrypt from "bcryptjs";

export const createPassword = async (password) => {
  return bcrypt.hash(password, Number(process.env.BCRYPT));
};

export const comparePassword = async (password, mainPassword) => {
  return bcrypt.compare(password, mainPassword);
};
