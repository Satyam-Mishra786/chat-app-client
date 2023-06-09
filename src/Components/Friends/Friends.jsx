import React, { useContext, useEffect } from "react";
import "./friends.css";
import AddFriend from "./AddFriend";
import axios from "axios";
import UserContext from "../../UserContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Friends = ({
  friendList,
  handleConversation,
  friendNumber,
  setFriendList,
}) => {
  const { user } = useContext(UserContext);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Load Friend List
  useEffect(() => {
    if (!user) return;

    const getFriends = () => {
      axios
        .get(`${SERVER_URL}/api/conversation/${user?.userId}`)
        .then((res) => {
          const data = res.data.friends;
          setFriendList(data);
        });
    };

    getFriends();
  }, [user, setFriendList]);

  return (
    <>
      <AddFriend />
      <div className="userList">
        {friendList?.length > 0 &&
          friendList.map((friend, index) => (
            <div
              className={friendNumber === index ? "cards selected" : "cards"}
              key={index}
              onClick={() => handleConversation(index)}
            >
              {capitalizeFirstLetter(friend?.name)}
            </div>
          ))}
      </div>
    </>
  );
};

export default Friends;
