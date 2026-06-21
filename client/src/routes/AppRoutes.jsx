import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile.jsx";
import Problems from "../pages/Problems.jsx";
import Login from "../pages/Login.jsx"; 
import Register from "../pages/Register.jsx";
import ProblemDetails from "../pages/ProblemDetails.jsx";
import MainLayout from "../layout/Mainlayout.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
  <Routes>

    <Route element={<MainLayout />}>

      <Route path="/" element={<Problems />} />

      <Route
        path="/problems/:id"
        element={<ProblemDetails />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

    </Route>

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

  </Routes>
</BrowserRouter>
  );
};

export default AppRoutes;
