import React, { useState, useRef, useEffect } from "react";
import Chat from "../Chat/Chat";
import send from "../../img/send.png";

import axios from "axios";
import { useNavigate, useParams } from "react-router";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Conversation = ({
  friendList,
  friendNumber,
  setFriendNumber,
  handleSend,
  currentChat,
  setCurrentChat,
}) => {
  const chatBottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const navigate = useNavigate();
  console.log(conversationId);

  // Get message for a conversation
  useEffect(() => {
    const getMessages = () => {
      axios
        .get(`${SERVER_URL}/api/message/${conversationId}`)
        .then((res) => {
          const data = res.data.messages;
          setCurrentChat(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMessages();
  }, [setCurrentChat, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const scrollToBottom = () => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBack = async () => {
    setCurrentChat([]);
    setFriendNumber(null);
  };
  useEffect(() => {
    if (friendNumber === null) {
      navigate("/chat/friends");
    }
  }, [friendNumber, navigate]);

  return (
    <div className="conversation">
      {friendNumber >= 0 ? (
        <>
          <div className="chatHead">
            <span onClick={() => handleBack()}>Arrow</span>
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
