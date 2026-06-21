import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1>Navbar</h1>
      <Link
        to="/"
        className="text-xl font-bold"
      >
        Code Arena
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/">Problems</Link>

        {user ? (
          <span>{user.name}</span>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;