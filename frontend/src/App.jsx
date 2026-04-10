import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SIGNIN, SIGNUP, HOME } from "./utils/route.js";
import Navbar from "./components/Navabr.jsx";
import Footer from "./components/Footer.jsx";
import HomePageRightNow from "./pages/HomePageRightNow.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path={HOME} element={<HomePageRightNow />} />
            <Route path={SIGNIN} element={<SignIn />} />
            <Route path={SIGNUP} element={<SignUp />} />
          </Routes>
        </AuthContextProvider>
        <Footer />
      </DarkModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
