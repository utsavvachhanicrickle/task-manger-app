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
