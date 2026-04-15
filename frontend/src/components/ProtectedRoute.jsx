import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { SIGNIN } from "../utils/route.js";

const ProtectedRoute = () => {
  const { authData } = useContext(AuthContext);

  return authData ? <Outlet /> : <Navigate to={SIGNIN} replace />;
};

export default ProtectedRoute;