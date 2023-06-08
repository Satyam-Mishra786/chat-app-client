import React, { useContext, useEffect, useRef, useState } from "react";
import "./message.css";
import { io } from "socket.io-client";
import UserContext from "../../UserContext";
import axios from "axios";

import Friends from "../Friends/Friends";
import Conversation from "../Conversation/Conversation";
import { Outlet, Route, Routes } from "react-router";

const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Message = () => {
  const [friendNumber, setFriendNumber] = useState(-1);
  const [currentChat, setCurrentChat] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const socket = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket.current = io(`${SOCKET_IO_URL}`);
  }, []);

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
    if (friendList[friendNumber]?.conversationId) {
      socket?.current.emit(
        "joinRoom",
        friendList[friendNumber]?.conversationId
      );
    }
  }, [friendNumber, friendList]);

  return (
    <Routes>
      <Route
        path="friends"
        element={<Friends />}
        friendList={friendList}
        friendNumber={friendNumber}
        setFriendList={setFriendList}
        handleConversation={handleConversation}
      />
      <Route
        path=":conversationId"
        element={<Conversation />}
        friendList={friendList}
        friendNumber={friendNumber}
        handleSend={handleSend}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <Outlet />
    </Routes>
  );
};

export default Message;
