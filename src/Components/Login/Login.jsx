import React, { useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import UserContext from "../../UserContext";
import axios from "axios";

import { SERVER_URL } from "../..";


const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in");
    axios
      .post(`${SERVER_URL}/api/auth/login`, {
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPass").value,
      })
      .then((res) => {
        const data = res.data;
        setUser(data.user);
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  return (
    <>
      <div className="my-container">
        <div className="my-wrapper">
          <h1 className="login-head">Login</h1>
          <form onSubmit={handleLogin} className="my-form">
            <div className="my-form-item">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                autoComplete="off"
                required
                type="text"
                className="form-input"
                id="inputEmail"
              />
            </div>
            <div className="flex flex-col gap-my-form-item">
              <label htmlFor="inputPass" className=" form-label">
                Password
              </label>
              <input
                autoComplete="off"
                required
                type="text"
                className="form-input"
                id="inputPass"
              />
            </div>
            <div className="w-3/5 mx-auto">
              <button className="btn-primary w-full" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="flex-[1]">
            <button
              onClick={() => navigate("/auth/register")}
              className="text-sm underline"
            >
              Register?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
