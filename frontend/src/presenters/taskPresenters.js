import { taskModules } from "../modules/tasModules";
import { MESSAGES } from "../utils/messages";
import toast from "../utils/Toast.jsx";

export const taskPresenters = {
  createTask: async (formData, projects, setProjects) => {
    try {
      const { data } = await taskModules.createTask(formData);
      setProjects(
        projects.map((project) => {
          if (project._id !== data.task.projectId) return project;
          else {
            return { ...project, tasks: [data.task, ...(project.tasks || [])] };
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
  updatetask: async (id, formData, projects, setProjects) => {
    try {
      const { data } = await taskModules.updateTask(id, formData);
      console.log(data);
      // setProjects(
      //   projects.map((project) => {
      //     if (project._id !== data.task.projectId) return project;
      //     else if (project._id !== data.task.lastProjectId)
      //       return {
      //         ...project,
      //         tasks: project.tasks.filter(
      //           (task) => task.projectId !== data.task.lastProjectId,
      //         ),
      //       };
      //     else {
      //       return {
      //         ...project,
      //         tasks: project.tasks.map((task) => {
      //           if (task._id !== data.task._id) return task;
      //           else {
      //             return {
      //               ...task,
      //               title: data.task.title,
      //               desc: data.task.desc,
      //               updatedAt: data.task.updatedAt,
      //               status: data.task.status,
      //               category: data.task.category,
      //               priority: data.task.priority,
      //               phase: data.task.phase,
      //               expiredAt: data.task.expiredAt,
      //               projectId: data.task.projectId,
      //             };
      //           }
      //         }),
      //       };
      //     }
      //   }),
      // );
      setProjects(
        projects.map((project) => {
          if (
            data.task.lastProjectId !== data.task.projectId &&
            project._id === data.task.lastProjectId
          ) {
            return {
              ...project,
              tasks: project.tasks.filter((task) => task._id !== data.task._id),
            };
          }

          if (project._id === data.task.projectId) {
            const exists = project.tasks.some(
              (task) => task._id === data.task._id,
            );

            return {
              ...project,
              tasks: exists
                ? project.tasks.map((task) =>
                    task._id === data.task._id
                      ? { ...task, ...data.task }
                      : task,
                  )
                : [...project.tasks, data.task],
            };
          }

          return project;
        }),
      );
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
