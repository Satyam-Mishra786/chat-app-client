import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import "./home.css";
import UserContext from "../../UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    if (!localUser) {
      navigate("/auth/login");
      return;
    }
    localUser = JSON.parse(localUser);
    setUser(localUser);
    navigate("/chat");
  }, [navigate, setUser]);

  useEffect(() => {
    if (user?.token) {
      navigate("/chat");
      console.log(user);
    }
  }, [navigate, user]);

  return (
    <div className="home">
      <div className="homeWrapper">
        <h1 className="homeHeader">Welcome to Sampark App</h1>
        <h2>Please Login/Register to Continue</h2>
        <div className="btnContainer">
          <button className="homeBtn" onClick={() => navigate("/auth/login")}>
            Login
          </button>
          <button className="homeBtn" onClick={() => navigate("/auth/login")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
