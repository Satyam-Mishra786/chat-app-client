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
        alert("Something went wrong");
      });
  };
  return (
    <>
      <div className="login">
        <div className="loginContainer">
          <h1 className="loginHead">Login User</h1>
          <form onSubmit={handleLogin} className="wrapper">
            <div className="fieldContainer">
              <label htmlFor="inputEmail">Email : </label>
              <input
                autoComplete="off"
                required
                type="text"
                className="input-box"
                id="inputEmail"
              />
            </div>
            <div className="fieldContainer">
              <label htmlFor="inputPass">Password : </label>
              <input
                autoComplete="off"
                required
                type="text"
                className="input-box"
                id="inputPass"
              />
            </div>
            <button className="btn-Submit" type="submit">
              Login
            </button>
          </form>
          <div className="more">
            <button
              onClick={() => navigate("/auth/register")}
              className="btn-register"
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
