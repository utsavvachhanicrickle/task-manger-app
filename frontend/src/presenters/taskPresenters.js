import { taskModules } from "../modules/tasModules";
import { ADD, DELETE, GET, UPDATE } from "../constants/actionTypes";
import { MESSAGES } from "../utils/messages";
import toast from "../utils/Toast.jsx";

export const taskPresenters = {
  createTask: async (formData, { dispatch }) => {
    try {
      const { data } = await taskModules.createTask(formData);
      dispatch({ type: ADD, data });
      toast.success(MESSAGES.TASK_CREATED);

      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  updatetask: async (id, formData, { dispatch }) => {
    try {
      const { data } = await taskModules.updateTask(id, formData);
      dispatch({ type: UPDATE, data });
      toast.success(MESSAGES.TASK_UPDATED);

      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  deletetask: async (id, { dispatch }) => {
    try {
      const { data } = await taskModules.deleteTask(id);
      dispatch({ type: DELETE, data });
      toast.success(MESSAGES.TASK_DELETE);
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  getusertask: async (refreshClick, { dispatch }) => {
    try {
      const { data } = await taskModules.getUserTask();
      dispatch({ type: GET, data });
      if (refreshClick) {
        toast.success(MESSAGES.FETCHED_SUCCESSFULY);
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
};
