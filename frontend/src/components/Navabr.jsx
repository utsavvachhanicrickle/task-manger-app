import React, { useContext } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { logout } from "../presenters/authPresenters";
import { useNavigate } from "react-router-dom";
import { SIGNIN, SIGNUP, HOME } from "../utils/route";
import Button from "./Button";
import { buttonVariants } from "../utils//schema";
import { AuthContext } from "../context/authContext";
import { DarkModeContext } from "../context/darkModeContext";

function Navbar() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { authData, setAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    logout({ setAuthData, navigate });
  };

  return (
    <div className="flex justify-between items-center p-3 shadow-md bg-(--bg-card) text-(--text-primary) transition-colors">
      <Button
        variant="other"
        onClick={() => navigate(HOME)}
        className="flex items-center gap-2 font-semibold text-lg"
      >
        <CalendarTodayIcon />
        <p className="hidden md:block">Task Management</p>
      </Button>

      <div className="flex items-center gap-3">
        <Button
          variant={buttonVariants.OUTLINE}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>

        {authData ? (
          <>
            <p className="hidden sm:block text-(--text-secondary)">
              Hi, {authData.firstName}
            </p>

            <Button variant={buttonVariants.PRIMARY} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate(SIGNIN)}
              variant={buttonVariants.OUTLINE}
            >
              Sign In
            </Button>

            <Button
              onClick={() => navigate(SIGNUP)}
              variant={buttonVariants.PRIMARY}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
