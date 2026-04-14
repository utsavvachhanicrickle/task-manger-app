import { taskModules } from "../modules/tasModules";
import { MESSAGES } from "../utils/messages";
import toast from "../utils/Toast.jsx";

export const taskPresenters = {
  createTask: async (formData, projects, setProjects) => {
    try {
      const { data } = await taskModules.createTask(formData);
      console.log(projects);

      setProjects(
        projects.map((project) => {
          if (project._id !== data.task.projectId) return project;
          else {
            return { ...project, tasks: [...(project.tasks || []), data.task] };
          }
        }),
      );
      toast.success(MESSAGES.TASK_CREATED);

      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  updatetask: async (id, formData, setProjects) => {
    try {
      const { data } = await taskModules.updateTask(id, formData);
      setProjects(data.projects);
      toast.success(MESSAGES.TASK_UPDATED);

      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
  deletetask: async (id, projects, setProjects) => {
    try {
      const { data } = await taskModules.deleteTask(id);
      setProjects(
        projects.map((project) =>
          project._id !== data.projectId
            ? {
                ...project,
                tasks: project.tasks.filter(
                  (task) => task._id !== data.task._id,
                ),
              }
            : project,
        ),
      );
      toast.success(MESSAGES.TASK_DELETE);
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || MESSAGES.SOMETHING_WRONG);
      return { success: false };
    }
  },
};
