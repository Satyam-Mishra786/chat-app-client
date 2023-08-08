import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="my-container">
      <h1 className="text-4xl text-slate-100 ">Welcome to Sampark App</h1>
      <h2 className="text-xl  text-green-300 flex flex-col items-center">
        <p>Please Login/Register 😊</p>
        <p>to Continue</p>
      </h2>
      <div className="flex flex-col gap-7 w-1/2">
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
