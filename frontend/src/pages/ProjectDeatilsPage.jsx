import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/projectCntext";
import TaskCard from "../components/tasks/kanban/TaskCard";
import AddEntityForm from "../components/tasks/AddEntityForm";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { projectsPresenters } from "../presenters/projectsPresnters";
import { taskPresenters } from "../presenters/taskPresenters";
import { taskFormFields } from "../utils/constants/taskFormFields";
import DeleteIcon from "@mui/icons-material/Delete";
import { buttonVariants } from "../utils/schema";

function ProjectDeatilsPage() {
  const { id } = useParams();
  const { projects, setProjects } = useContext(ProjectContext);
  const [openTask, setOpenTask] = useState(false);
  const [project, setProject] = useState(projects);
  const [editTaskId, setEditTaskId] = useState(false);
  const [task, setTask] = useState({});
  const [projectOptions, setProjectOptions] = useState({});

  useEffect(
    () => setProject(projects.find((p) => p._id === id)),
    [projects, id],
  );

  useEffect(() => {
    setProjectOptions(
      projects.map((project) => ({ label: project.title, value: project._id })),
    );
  }, [projects]);

  const handleDeleteTask = (id) => {
    taskPresenters.deletetask(id, projects, setProjects);
  };

  const handleDeleteProject = (id) => {
    projectsPresenters.deleteProject(id, projects, setProjects);
  };

  const handleTaskSubmit = (formData) => {
    if (editTaskId) {
      taskPresenters.updatetask(editTaskId, formData, projects, setProjects);
      setEditTaskId(false);
      setTask({});
      setOpenTask(false);
    } else {
      taskPresenters.createTask(formData, projects, setProjects);
      setOpenTask(false);
    }
  };

  const handleTaskAdd = () => {
    setOpenTask(true);
    setEditTaskId(false);
  };

  const handleEditTask = (task) => {
    setOpenTask(true);
    setEditTaskId(task._id);
    setTask(task);
  };

  const handleCancle = () => {
    setEditTaskId(false);
    setOpenTask(false);
  };
  if (!project) return <div>Loading...</div>;
  return (
    <div className="bg-(--bg-card) shadow-(--shadow) border border-(--border) rounded-xl p-4 md:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-lg md:text-xl font-semibold text-(--text-primary)">
            {project.title}
          </p>
          <p className="text-sm text-(--text-secondary) mt-1">{project.desc}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant={buttonVariants.PRIMARY}
            onClick={handleTaskAdd}
            className="text-sm px-3 py-1.5"
          >
            Add Task
          </Button>

          <Button
            variant="other"
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-500/80 transition"
            onClick={() => handleDeleteProject(project._id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-4 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {project.tasks?.length > 0 ? (
          project.tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p className="text-(--text-muted) text-sm">No tasks available</p>
        )}
      </div>

      {/* Modal / Form */}
      {openTask && (
        <div className="mt-4">
          <AddEntityForm
            handleSubmit={handleTaskSubmit}
            editEntityId={editTaskId}
            handleCancle={handleCancle}
            entity={task}
            formDataFields={taskFormFields.addTaskFields(
              editTaskId,
              task,
              projectOptions,
            )}
            formDataButtons={taskFormFields.addTaskButtons}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectDeatilsPage;
