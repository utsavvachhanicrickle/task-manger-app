import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { projectsPresenters } from "../presenters/projectsPresnters";

export const ProjectContext = createContext();

export const ProjectContextProvider = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      await projectsPresenters.fetchProjects(false, setProjects);
    };

    loadProjects();
  }, []);

  useEffect(() => {
    setTasks(
      projects.flatMap((project) =>
        project?.tasks?.length ? project.tasks : [],
      ),
    );
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, tasks }}>
      <Outlet />
    </ProjectContext.Provider>
  );
};
