import React, { useContext, useState } from "react";
import UserContext from "../../UserContext";
import { useNavigate } from "react-router";

const AddFriend = () => {
  const [room, setRoom] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function capitalizeFirstLetter(str) {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const addFriend = () => {
    const userId = user?.userId;
    const friendEmail = document.querySelector(".friendEmailInput").value;

    if (!userId || !friendEmail) {
      alert("Please provide friend email");
      return;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
    alert("Logged Out");
  };
  return (
    <div className="userInfo">
      <h1>Chats</h1>
      <h3>{capitalizeFirstLetter(user?.username)}</h3>
      {/* <h3>UserId : {user?.userId}</h3> */}

      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="friendEmailInput"
        placeholder="Friend Email.."
      />
      <button className="addFriend" onClick={addFriend}>
        Add Friend
      </button>
      <button className="addFriend" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default AddFriend;
