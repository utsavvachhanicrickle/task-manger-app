import { APIENDPOINTS } from "../utils/apiEndPoints.js";
import API from "../services";

export const authModules = {
  signIn: (formData) => API.post(APIENDPOINTS.SIGNIN, formData),
  signUp: (formData) => API.post(APIENDPOINTS.SIGNUP, formData),
  logout: () => API.post(APIENDPOINTS.LOGOUT),
};
