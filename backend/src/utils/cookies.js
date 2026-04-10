import { COOKIESSCHEMA } from "./schema/index.js";

export const setCookies = async({ type, token, maxAge, res }) => {
  res.cookie(type, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === COOKIESSCHEMA.PRODUCTION,
    sameSite: "lax",
    maxAge: maxAge,
  });
};

export const clearAuthCookies = async(res) => {
  res.clearCookie(COOKIESSCHEMA.ACCESSTOKEN);
  res.clearCookie(COOKIESSCHEMA.REFRESHTOKEN);
};