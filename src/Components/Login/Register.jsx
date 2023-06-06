import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  const [aboutUser, setAboutUser] = useState({
    username: "",
    email: "",
    password: "",
  });
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

    if (!aboutUser.username || !aboutUser.email || !aboutUser.password) return;

    axios
      .post(`${SERVER_URL}api/auth/register`, aboutUser)
      .then((res) => {
        alert("User Created Successfully");
        navigate("/auth/login");
      })
      .catch((err) => {
        alert("Something went wrong!!!");
      });
  };

  return (
    <div className="login register">
      <div className="loginContainer registerContainer">
        <h1 className="loginHead">Register User</h1>
        <form onSubmit={handleRegister} className="wrapper registerWrapper">
          <div className="fieldContainer">
            <label htmlFor="username">Username : </label>
            <input
              className="input-box"
              name="username"
              onChange={handleChange}
              autoComplete="off"
              required
              type="text"
              id="username"
            />
          </div>
          <div className="fieldContainer">
            <label htmlFor="inputEmail">Email : </label>
            <input
              autoComplete="off"
              className="input-box"
              name="email"
              onChange={handleChange}
              required
              type="text"
              id="inputEmail"
            />
          </div>
          <div className="fieldContainer">
            <label htmlFor="inputPass">Password : </label>
            <input
              autoComplete="off"
              className="input-box"
              name="password"
              onChange={handleChange}
              required
              type="text"
              id="inputPass"
            />
          </div>
          <button className="btn-Submit" type="submit">
            Register
          </button>
        </form>
        <div className="more">
          <span>Already a user?</span>
          <button
            className="btn-register"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
