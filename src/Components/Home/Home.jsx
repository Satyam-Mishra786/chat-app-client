import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="my-container">
      <h1 className="text-4xl text-sky-200 ">Welcome to Sampark App</h1>
      <h2 className="text-xl  text-green-300">
        Please Login/Register to Continue
      </h2>
      <div className="flex flex-col gap-7">
        <button className="btn-primary" onClick={() => navigate("/auth/login")}>
          Login
        </button>
        <button
          className="btn-primary"
          onClick={() => navigate("/auth/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
