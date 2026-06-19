import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";
import AuthContext from "../context/AuthContext.js";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = React.useContext(AuthContext);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      setUser(res.data.data.user);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;