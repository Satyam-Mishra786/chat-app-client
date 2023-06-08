import React, { useState, useRef, useEffect } from "react";
import Chat from "../Chat/Chat";
import send from "../../img/send.png";

import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Conversation = ({
  friendList,
  friendNumber,
  handleSend,
  currentChat,
  setCurrentChat,
}) => {
  const chatBottomRef = useRef(null);
  const [message, setMessage] = useState("");

  // Get message for a conversation
  useEffect(() => {
    if (friendList.length === 0) return;

    const getMessages = () => {
      axios
        .get(
          `${SERVER_URL}/api/message/${friendList[friendNumber]?.conversationId}`
        )
        .then((res) => {
          const data = res.data.messages;
          setCurrentChat(data);
        });
    };
    getMessages();
  }, [friendList, friendNumber, setCurrentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const scrollToBottom = () => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="conversation">
      {friendNumber >= 0 ? (
        <>
          <div className="chatHead">
            {friendList[friendNumber]?.name.toUpperCase()}
          </div>
          <Chat chatBottomRef={chatBottomRef} currentChat={currentChat} />
          <div className="sendMessage">
            <div
              role="textbox"
              contentEditable="true"
              type="text"
              className="inputMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></div>
            <button className="sendBtn" onClick={handleSend}>
              <img src={send} alt="Send" className="send" />
            </button>
          </div>
        </>
      ) : (
        <h1
          style={{
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          Select a Conversation
        </h1>
      )}
    </div>
  );
};

export default Conversation;
