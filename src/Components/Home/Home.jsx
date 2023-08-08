import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="my-container">
      <h1 className="text-4xl text-sky-200 ">Welcome to Sampark App</h1>
      <h2 className="text-xl  text-green-300">
        Please Login/Register to Continue
      </h2>
      <div className="flex flex-col gap-7">
        <Link to="/auth/login">
          <button className="btn-primary w-full h-full">Login</button>
        </Link>
        <Link to="/auth/register">
          <button className="btn-primary w-full h-full">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
