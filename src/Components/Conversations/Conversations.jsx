import React from "react";
import "./conversation.css";

const Conversations = ({ friendList, handleConversation, friendNumber }) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="userList">
      {friendList.length > 0 &&
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
  );
};

export default Conversations;
