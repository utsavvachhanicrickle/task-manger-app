import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { HOME, SIGNIN, SIGNUP } from "../utils/route";

function Footer({ darkMode }) {
  return (
    <footer
      className="w-full mt-10 border-t backdrop-blur-md"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT - BRAND */}
        <Link
          to={HOME}
          className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition"
          style={{ color: "var(--text-primary)" }}
        >
          <CalendarTodayIcon className="text-(--primary)" />
          Task App
        </Link>

        {/* CENTER - LINKS */}
        <div className="flex items-center gap-6 text-sm md:text-base">
          <Link
            to={SIGNIN}
            className="text-(--text-secondary) hover:text-(--primary) transition"
          >
            Sign In
          </Link>

          <Link
            to={SIGNUP}
            className="text-(--text-secondary) hover:text-(--primary) transition"
          >
            Sign Up
          </Link>
        </div>

        {/* RIGHT - COPYRIGHT */}
        <div className="text-xs md:text-sm text-(--text-muted) text-center md:text-right">
          © {new Date().getFullYear()} Task App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;