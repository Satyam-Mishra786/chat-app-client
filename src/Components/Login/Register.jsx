import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { SERVER_URL } from "../..";
import { Link } from "react-router-dom";
import Spinner2 from "../Spinner/Spinner2";
import { toast } from "react-toastify";

const Register = () => {
  const [aboutUser, setAboutUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [waitForResponse, setWaitForResponse] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAboutUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setWaitForResponse(true);

    if (!aboutUser.username || !aboutUser.email || !aboutUser.password) return;

    axios
      .post(`${SERVER_URL}/api/auth/register`, {
        username: aboutUser.username,
        email: aboutUser.email,
        password: aboutUser.password,
      })
      .then((res) => {
        toast.success("User Created Successfully");
        navigate("/auth/login");
      })
      .catch((err) => {
        toast.error("Something went wrong!!!");
      })
      .finally(() => {
        setWaitForResponse(false);
      });
  };

  return (
    <>
      {waitForResponse && <Spinner2 />}
      <div className="my-container">
        <div className="my-wrapper">
          <h1 className="login-head">Register User</h1>
          <form onSubmit={handleRegister} className="my-form">
            <div className="my-form-item">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                className="form-input"
                name="username"
                onChange={handleChange}
                autoComplete="off"
                required
                type="text"
                id="username"
              />
            </div>
            <div className="my-form-item">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                autoComplete="off"
                className="form-input"
                name="email"
                onChange={handleChange}
                required
                type="text"
                id="inputEmail"
              />
            </div>
            <div className="my-form-item">
              <label htmlFor="inputPass" className="form-label">
                Password
              </label>
              <input
                autoComplete="off"
                className="form-input"
                name="password"
                onChange={handleChange}
                required
                type="text"
                id="inputPass"
              />
            </div>
            <div className="w-3/5 mx-auto">
              <button className="btn-primary w-full" type="submit">
                Register
              </button>
            </div>
          </form>
          <div className="text-cyan-300">
            <span>Already a user? 👉 </span>
            <Link to="/auth/login">
              <button className="dashed text-lg text-slate-50 underline">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
