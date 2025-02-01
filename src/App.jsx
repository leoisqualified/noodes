import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// Component to conditionally show Navbar
const MainLayout = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/create-post" element={<CreatePostPage />} />
      </Routes>
    </>
  );
};

export default App;
