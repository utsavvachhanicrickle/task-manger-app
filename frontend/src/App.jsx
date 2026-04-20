import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SIGNIN,
  SIGNUP,
  HOME,
  PROJECTDEATILS,
  AICHATBOAD,
} from "./utils/route.js";
import Navbar from "./components/Navabr.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDeatilsPage from "./pages/ProjectDeatilsPage.jsx";
import AIChatboadPage from "./pages/AIChatboadPage.jsx";
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
              <Route element={<ProjectContextProvider />}>
                <Route path={HOME} element={<HomePage />} />
                <Route path={PROJECTDEATILS} element={<ProjectDeatilsPage />} />
                <Route path={AICHATBOAD} element={<AIChatboadPage />} />
              </Route>
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
