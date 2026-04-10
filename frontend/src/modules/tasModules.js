import API from "../services";
import { APIENDPOINTS } from "../utils/apiEndPoint";

export const taskModules = {
  createTask: (formData) => API.post(APIENDPOINTS.CREATETASK, formData),
  updateTask: (id, formData) => API.put(`${APIENDPOINTS.UPDATETASK}${id}`, formData),
  deleteTask: (id) => API.delete(`${APIENDPOINTS.DELETETASK}${id}`),
  getUserTask: () => API.get(APIENDPOINTS.GETUSERTASK),
};
