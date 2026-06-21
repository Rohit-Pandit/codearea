import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { logoutUser } from "../api/auth";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          Code Arena
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Problems
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-400 transition"
              >
                Profile
              </Link>

              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md transition "
                >
                  Admin Dashboard
                </Link>
              )}

              <span className="text-slate-400 text-sm">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition cursor-pointer hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;