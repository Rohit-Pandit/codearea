import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx";

import Problems from "../pages/Problems.jsx";
import ProblemDetails from "../pages/ProblemDetails.jsx";
import Profile from "../pages/Profile.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Problems />} />

          <Route
            path="/problems/:id"
            element={<ProblemDetails />}
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>

        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;