import API from "../services";
import { APIENDPOINTS } from "../utils/apiEndPoints";

export const projectModules = {
    createProject: (formData) => API.post(APIENDPOINTS.CREATEPROJECT,formData),
    updateProject: (id, formData) => API.put(`${APIENDPOINTS.UPDATEPROJECT}${id}`,formData),
    deleteProject: (id) => API.delete(`${APIENDPOINTS.DELETEPROJECT}${id}`),
    getProject: () => API.get(APIENDPOINTS.GETPROJECT),
}