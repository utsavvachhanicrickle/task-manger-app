import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import { buttonVariants } from "../../utils/schema";
import FilterDataComponents from "../tasks/FilterDataComponents";
import { taskFormFields } from "../../utils/constants/taskFormFields";
import Button from "../Button";

function TaskNavabar({ handleProjectAdd, handleTaskAdd }) {
  const [filterTask, setFilterTask] = useState({});
  const [sideBar, setSidBar] = useState(false);

  return (
    <div className="w-full px-4 py-3 bg-(--bg-primary) border-b border-(--border) shadow-(--shadow)">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant={buttonVariants.PRIMARY} onClick={handleProjectAdd}>
            Add Project
          </Button>

          <Button variant={buttonVariants.PRIMARY} onClick={handleTaskAdd}>
            Add Task
          </Button>
        </div>

        <div className="hidden items-center gap-3 md:flex text-center">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--bg-secondary) border border-(--border) w-65">
            <SearchIcon className="text-(--text-muted)" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-transparent outline-none text-sm text-(--text-primary) placeholder:text-(--text-muted)"
            />
          </div>

          <div className="min-w-45">
            <FilterDataComponents
              data={[]}
              setData={setFilterTask}
              component={taskFormFields.fillterTaskFields}
            />
          </div>
        </div>

        <div className="flex md:hidden items-center justify-between">
          <Button
            variant={buttonVariants.OUTLINE}
            onClick={() => setSidBar(!sideBar)}
          >
            {sideBar ? <MenuOpenIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {sideBar && (
        <div className="md:hidden mt-3 p-4 flex flex-col gap-3 rounded-xl bg-(--bg-secondary) border border-(--border) shadow-(--shadow)">
          {/* SEARCH */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--bg-primary) border border-(--border)">
            <SearchIcon className="text-(--text-muted)" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-transparent outline-none text-sm text-(--text-primary)"
            />
          </div>

          {/* FILTER */}
          <FilterDataComponents
            data={[]}
            setData={setFilterTask}
            component={taskFormFields.fillterTaskFields}
          />
        </div>
      )}
    </div>
  );
}

export default TaskNavabar;
