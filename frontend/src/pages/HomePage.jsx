import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ProjectContext } from "../context/projectCntext";
import { buttonVariants } from "../utils/schema";
import { projectsPresenters } from "../presenters/projectsPresnters";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../utils/route";
import TaskNavabar from "../components/tasks/TaskNavabar";
import AddEntityForm from "../components/tasks/AddEntityForm";
import { taskFormFields } from "../utils/constants/taskFormFields";
import { taskPresenters } from "../presenters/taskPresenters";
import { projectFormFields } from "../utils/constants/projectFormFields";
import TaskShownComponents from "../components/kanban/TaskShownComponents";

function HomePage() {
  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const { projects, tasks, setProjects } = useContext(ProjectContext);

  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [editTaskId, setEditTaskId] = useState(false);
  const [editProjectId, setEditProjectId] = useState(false);

  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [projectOptions, setProjectOptions] = useState({});

  useEffect(() => {
    const fetProjects = async () =>
      await projectsPresenters.fetchProjects(false, setProjects);

    fetProjects();
  }, []);

  useEffect(() => {
    setProjectOptions(
      projects.map((project) => ({ label: project.title, value: project._id })),
    );
  }, [projects]);

  const handleProjectAdd = () => {
    setOpenAddMenu(true);
    setAddProject(true);
  };

  const handleTaskAdd = () => {
    setOpenAddMenu(true);
    setAddProject(false);
  };

  const handleCancle = () => {
    setOpenAddMenu(false);
    setAddProject(false);
    setEditTaskId(false);
    setEditProjectId(false);
  };

  const handleTaskSubmit = (formData) => {
    if (editTaskId) {
    } else {
      taskPresenters.createTask(formData, projects, setProjects);
      setOpenAddMenu(false);
      setAddProject(false);
      setProject({});
    }
  };

  const handleEditProject = (projectData) => {
    setEditProjectId(projectData._id);
    setProject(projectData);
    setOpenAddMenu(true);
    setAddProject(true);
  };

  const handleProjectSubmit = (formData) => {
    if (editProjectId) {
      projectsPresenters.updateProject(
        editProjectId,
        formData,
        projects,
        setProjects,
      );
      setAddProject(false);
      setProject({});
      setEditProjectId(null);
      setOpenAddMenu(false);
    } else {
      projectsPresenters.createProject(formData, projects, setProjects);
      setAddProject(false);
      setOpenAddMenu(false);
    }
  };

  const handleDeleteTask = (id) => {
    taskPresenters.deletetask(id, projects, setProjects);
  };

  if (!authData) {
    return (
      <div className="flex justify-center p-4 min-h-screen bg-(--bg)">
        <div>
          <Button
            variant={buttonVariants.PRIMARY}
            onClick={() => navigate(SIGNIN)}
          >
            First Login Your Self.
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--bg)">
      <TaskNavabar
        handleProjectAdd={handleProjectAdd}
        handleTaskAdd={handleTaskAdd}
      />

      <TaskShownComponents
        task={tasks}
        project={projects}
        handleEditProject={handleEditProject}
        handleDeleteTask={handleDeleteTask}
      />

      {openAddMenu &&
        (addProject ? (
          <AddEntityForm
            handleSubmit={handleProjectSubmit}
            editEntityId={editProjectId}
            handleCancle={handleCancle}
            entity={project}
            formDataFields={projectFormFields.addProjectFields(
              editProjectId,
              project,
            )}
            formDataButtons={projectFormFields.addProjectButtons}
          />
        ) : (
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
        ))}
    </div>
  );
}

export default HomePage;
