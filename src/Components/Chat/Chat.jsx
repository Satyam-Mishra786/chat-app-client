import React, { useContext } from "react";
import UserContext from "../../UserContext";
import "./chat.css";

const Chat = ({ currentChat, chatBottomRef }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="chat">
      {currentChat.length === 0 ? (
        <h2 style={{ color: "grey" }}>Write a message</h2>
      ) : (
        <ul className="chat-list-item">
          {currentChat.map((e, index) => {
            return e.msg?.length > 0 ? (
              <li
                className={e.sendBy === user.userId ? "right msg" : "left msg"}
                key={index}
              >
                {e.msg}
              </li>
            ) : (
              <div className="div"></div>
            );
          })}
          <li ref={chatBottomRef}></li>
        </ul>
      )}
    </div>
  );
};

export default Chat;
