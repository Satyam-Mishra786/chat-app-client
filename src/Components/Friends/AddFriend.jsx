import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router";
import UserImg from "../../img/user.png";

const AddFriend = ({ handleAddFriend, friendEmail, setFriendEmail }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function capitalizeFirstLetter(str) {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
    alert("Logged Out");
  };
  return (
    <div className="flex flex-col justify-start items-start w-full h-1/5 p-3 bg-gradient-to-b from-blue-300 to-green-400   rounded-tl-xl rounded-tr-xl">
      <div className="flex flex-row gap-2 items-center mb-2">
        <div className="w-11 h-11">
          <img src={UserImg} alt="" className="w-full h-full rounded-full" />
        </div>
        <h1 className="text-3xl text-slate-200">
          {capitalizeFirstLetter(user?.username)}
        </h1>
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          className="placeholder:text-slate-500 bg-inherit border-t-0 border-e-0 border-b-1 border-s-4 border-s-lime-500 border-2 border-b-slate-700 outline-none text-slate-900 bold px-2 py-1"
          placeholder="Friend's Email.."
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className="btn-primary-sm"
          onClick={() => handleAddFriend(friendEmail)}
        >
          Add Friend
        </button>
        <button className="btn-primary-sm" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AddFriend;
