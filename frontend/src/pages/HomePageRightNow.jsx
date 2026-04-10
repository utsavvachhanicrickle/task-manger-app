import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../utils/route";
import TaskNavabar from "../components/tasks/TaskNavabar";
import { AuthContext } from "../context/authContext";

function HomePageRightNow() {
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
    </div>
  );
}

export default HomePageRightNow;
