import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { HOME } from "../utils/route.js";

const PublicRoute = () => {
  const { authData } = useContext(AuthContext);

  return authData ? <Navigate to={HOME} replace /> : <Outlet />;
};

export default PublicRoute;