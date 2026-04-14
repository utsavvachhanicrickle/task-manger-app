import Project from "../modules/Project.modules.js";
import Task from "../modules/Task.modules.js";
import { AuthValidation } from "../utils/validations/AuthValidtion.js";
import { ProjectValidation } from "../utils/validations/ProjectValidation.js";

export const projectServices = {
  createProjectService: async (data, userId) => {
    AuthValidation.userExists(userId);
    ProjectValidation.notExistesData(data);
    const { title, desc } = data;
    const newProject = await Project.create({ title, desc, userId });
    return newProject;
  },
  updateProjectService: async (data, _id, userId) => {
    AuthValidation.userExists(userId);
    ProjectValidation.notExistesData(data);

    const existingProject = await Project.findById(_id);
    ProjectValidation.projectExists(existingProject);
    AuthValidation.accessChecking(existingProject.userId, userId);

    const { title, desc } = data;

    const updateData = { updateAt: new Date() };

    if (title) updateData.title = title;
    if (desc) updateData.desc = desc;

    const updatedProject = await Project.findByIdAndUpdate(_id, updateData, {
      returnDocument: "after",
    });
    return updatedProject;
  },
  deleteProjectService: async (_id, userId) => {
    const existingProject = await Project.findById(_id);
    ProjectValidation.projectExists(existingProject);
    AuthValidation.accessChecking(existingProject.userId, userId);
    await Project.deleteOne({ _id });
    await Task.deleteMany({ projectId: _id });
  },
  fetchProjectService: async (userId) => {
    AuthValidation.userExists(userId);
    const allProjects = await Project.find({ userId });
    const allTasks = await Task.find({ userId });

    const projectsDetils = allProjects.map((project) => {
      const projectTask = allTasks.filter(
        (task) => task.projectId.toString() === project._id.toString(),
      );

      return {
        _id: project._id,
        title: project.title,
        desc: project.desc,
        createAt: project.createdAt,
        updatedAt: project.updatedAt,
        tasks: projectTask,
      };
    });
    return projectsDetils;
  },
};
