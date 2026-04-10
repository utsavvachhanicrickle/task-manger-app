import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import Button from "../components/Button";
import { buttonVariants } from "../utils/schema";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../utils/route";
import TaskNavabar from "../components/tasks/TaskNavabar";
import AddEntityForm from "../components/tasks/AddEntityForm";
import { taskFormFields } from "../utils/constants/taskFormFields";
import { projectFormFields } from "../utils/constants/projectFormFields";
import { tasks } from "../utils/constants/tasks";
import { projects } from "../utils/constants/projects";

function HomePage() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [addProject, setAddProject] = useState(false);

  const handleProjectAdd = () => {
    setOpenAddMenu(true);
    setAddProject(true);
  };

  const handleTaskAdd = () => {
    setOpenAddMenu(true);
    setAddProject(false);
  };

  const handleTaskSubmit = (formData) => console.log(formData);

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

      <TaskShownComponents task={tasks} project={projects} />

      {openAddMenu && addProject ? (
        <AddEntityForm
          handleSubmit={handleTaskSubmit}
          editTaskId={editTaskId}
          handleCancle={handleTaskCancle}
          task={task}
          formDataFields={taskFormFields.addTaskFields}
          formDataButtons={taskFormFields.addTaskButtons}
        />
      ) : (
        <AddEntityForm
          handleSubmit={handleProjectSubmit}
          editTaskId={editProjectId}
          handleCancle={handleProjectCancle}
          task={project}
          formDataFields={projectFormFields.addTaskFields}
          formDataButtons={projectFormFields.addTaskButtons}
        />
      )}
    </div>
  );
}

export default HomePage;
 

i have this kinds of my home page fromes where i calle the tasks and projects and your task to creates the 

import React from 'react'

function TaskShownComponents() {
  return (
    <div>
      
    </div>
  )
}

export default TaskShownComponents
 this usings the npm install @dnd-kit/react


 and for you  i shared the singes entites for each iteams just cechkout and after this creates proper files for me 

export const projects = [
  {
    _id: { $oid: "661500000000000000000001" },
    title: "E-commerce Website",
    desc: "Build a full-stack e-commerce platform with payment integration",
    userId: { $oid: "69d35736bbf272e9a3461577" },
    createdAt: { $date: "2026-04-01T09:00:00.000Z" },
  },]


export const tasks = [
  {
    _id: { $oid: "662600000000000000000001" },
    title: "Setup project structure",
    desc: "Initialize frontend and backend folders",
    createdAt: { $date: "2026-04-06T09:00:00.000Z" },
    updatedAt: { $date: "2026-04-06T10:00:00.000Z" },
    userId: { $oid: "69d35736bbf272e9a3461577" },
    projectId: { $oid: "661500000000000000000001" },
    __v: 0,
    expiredAt: { $date: "2026-04-12T00:00:00.000Z" },
    status: "pending",
    category: "development",
    phase: "planning",
    priority: "high",
  },]