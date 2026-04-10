import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    return JSON.parse(localStorage.getItem("profile")) || null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem("profile", JSON.stringify(authData));
    } else {
      localStorage.removeItem("profile");
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};