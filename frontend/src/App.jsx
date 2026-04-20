import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SIGNIN, SIGNUP, HOME, PROJECTDEATILS } from "./utils/route.js";
import Navbar from "./components/Navabr.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDeatilsPage from "./pages/ProjectDeatilsPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { ProjectContextProvider } from "./context/projectCntext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path={HOME}
                element={
                  <ProjectContextProvider>
                    <HomePage />
                  </ProjectContextProvider>
                }
              />
              <Route
              path={PROJECTDEATILS}
                element={
                  <ProjectContextProvider>
                    <ProjectDeatilsPage />
                  </ProjectContextProvider>
                }
              />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path={SIGNIN} element={<SignIn />} />
              <Route path={SIGNUP} element={<SignUp />} />
            </Route>
          </Routes>
        </AuthContextProvider>
        <Footer />
      </DarkModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
