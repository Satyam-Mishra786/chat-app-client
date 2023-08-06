import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "../../UserContext";
import axios from "axios";

import Friends from "../Friends/Friends";
import Conversation from "../Conversation/Conversation";
import { Route, Routes, useNavigate } from "react-router";

import { SERVER_URL } from "../..";

const Message = () => {
  const [friendNumber, setFriendNumber] = useState(-1);
  const [currentChat, setCurrentChat] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const socket = useRef(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.current = io(`${SERVER_URL}`);
  }, []);

  useEffect(() => {
    navigate("/chat/friends");
  }, [navigate]);

  const handleSend = () => {
    const messageToSend = document.querySelector(".inputMessage").textContent;
    if (messageToSend.length === 0) return;

    const sendMessage = {
      conversationId: friendList[friendNumber]?.conversationId,
      msg: messageToSend,
      sendBy: user?.userId,
    };
    socket?.current.emit("message", sendMessage);

    document.querySelector(".inputMessage").textContent = "";

    // save message to database
    axios
      .post(`${SERVER_URL}/api/message`, {
        conversationId: friendList[friendNumber].conversationId,
        senderId: user.userId,
        msg: messageToSend,
      })
      .then((res) => {
        // const data = res.data.message;
      });
  };

  useEffect(() => {
    socket?.current.on("connect", () => {});

    socket?.current.on("message", (msg) => {
      setCurrentChat((prev) => [...prev, msg]);
    });
  }, []);

  const handleConversation = (index) => {
    if (friendList[friendNumber]?.conversationId) {
      socket?.current.emit(
        "leaveRoom",
        friendList[friendNumber]?.conversationId
      );
    }
    setFriendNumber(index);
  };

  useEffect(() => {
    if (!friendList[friendNumber]?.conversationId) return;
    navigate(`/chat/conversation/${friendList[friendNumber]?.conversationId}`);
  }, [friendNumber, friendList, navigate]);
  useEffect(() => {
    if (friendList[friendNumber]?.conversationId) {
      socket?.current.emit(
        "joinRoom",
        friendList[friendNumber]?.conversationId
      );
    }
  }, [friendNumber, friendList]);

  return (
    <div className="border-solid border-2 border-stone-900 h-4/5 w-full  rounded-xl">
      <Routes>
        <Route
          path="friends"
          element={
            <Friends
              friendList={friendList}
              friendNumber={friendNumber}
              setFriendList={setFriendList}
              handleConversation={handleConversation}
            />
          }
        />
        <Route
          path="/conversation/:conversationId"
          element={
            <Conversation
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              friendList={friendList}
              friendNumber={friendNumber}
              handleSend={handleSend}
              setFriendNumber={setFriendNumber}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Message;
