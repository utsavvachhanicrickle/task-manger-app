import User from "../modules/User.modules.js";
import { MESSAGES } from "../utils/messages/index.js";
import { createPassword, comparePassword } from "../utils/bcrypt.js";
import AppError from "../utils/AppError.js";
import {
  genrateAccessToken,
  genrateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import { setCookies, clearAuthCookies } from "../utils/cookies.js";
import { COOKIESSCHEMA } from "../utils/schema/index.js";
import { AuthValidation } from "../utils/validations/AuthValidtion.js";

export const authServices = {
  signUp: async (data) => {
    AuthValidation.notExistesData(data);
    const { email, password, confirmPassword, firstName, lastName } = data;
    const existingUser = await User.findOne({ email });

    AuthValidation.userAlrady(existingUser);
    AuthValidation.passwordChecking(password, confirmPassword);
    const hashedPassword = await createPassword(password);

    await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return true;
  },
  signIn: async (data, res) => {
    const { email, password } = data;
    if (!email || !password) {
      throw new AppError(MESSAGES.EMAIL_PASSWORD_REQUIRED, 400);
    }
    const existingUser = await User.findOne({ email });
    AuthValidation.userNotExistes(existingUser);
    // console.log(existingUser);
    const isPasswordCorrect = await comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect)
      throw new AppError(MESSAGES.PASSWORD_NOT_MATCH, 400);

    const accessToken = await genrateAccessToken({
      email: existingUser.email,
      id: existingUser._id,
    });

    const refreshToken = await genrateRefreshToken({
      email: existingUser.email,
      id: existingUser._id,
    });

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    await setCookies({
      type: COOKIESSCHEMA.ACCESSTOKEN,
      token: accessToken,
      maxAge: COOKIESSCHEMA.MAXAGE.ACCESSTOKEN,
      res,
    });

    await setCookies({
      type: COOKIESSCHEMA.REFRESHTOKEN,
      token: refreshToken,
      maxAge: COOKIESSCHEMA.MAXAGE.REFRESHTOKEN,
      res,
    });

    return existingUser;
  },
  logout: async (cookies, res) => {
    const { refreshToken } = cookies;

    if (refreshToken) {
      await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
    }

    await clearAuthCookies(res);
    return true;
  },
  refreshToken: async (cookies, res) => {
    const { refreshToken } = cookies;
    if (!refreshToken) throw new AppError(MESSAGES.TOKEN_NOT_FUND, 401);

    const user = await User.findOne({ refreshToken });

    if (!user) throw new AppError(MESSAGES.REFRESH_TOKEN_INVALID, 403);

    await verifyRefreshToken(refreshToken);

    const newAccessToken = await genrateAccessToken({
      email: user.email,
      id: user._id,
    });

    await setCookies({
      type: COOKIESSCHEMA.ACCESSTOKEN,
      token: newAccessToken,
      maxAge: COOKIESSCHEMA.MAXAGE.ACCESSTOKEN,
      res,
    });
    console.log(`refresh token : ${user.email}`);
    return true;
  },
};
