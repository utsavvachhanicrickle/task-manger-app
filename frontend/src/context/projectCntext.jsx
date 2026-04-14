import { useEffect } from "react";
import { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(
    () =>
      setTasks(
        projects.flatMap((project) => (project?.tasks?.length != 0 ? project.tasks : [])),
      ),
    [projects],
  );
  return (
    <ProjectContext.Provider value={{ projects, setProjects, tasks }}>
      {children}
    </ProjectContext.Provider>
  );
};
