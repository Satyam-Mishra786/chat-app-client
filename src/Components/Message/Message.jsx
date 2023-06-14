import React, { useContext, useEffect, useRef, useState } from "react";
import "./message.css";
import { io } from "socket.io-client";
import UserContext from "../../UserContext";
import axios from "axios";
import Chat from "../Chat/Chat";
import Conversations from "../Conversations/Conversations";

import send from "../../img/send.png";
import { useNavigate } from "react-router";
const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Message = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [friendNumber, setFriendNumber] = useState(-1);
  const [renderAgain, setRenderAgain] = useState(true);
  const chatBottomRef = useRef(null);
  const navigate = useNavigate();
  const socket = useRef(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket.current = io(SOCKET_IO_URL);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const scrollToBottom = () => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

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
  }, [user, renderAgain]);

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
  }, [friendList, friendNumber]);

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

  const addFriend = () => {
    const userId = user?.userId;
    const friendEmail = document.querySelector(".friendEmailInput").value;

    if (!userId || !friendEmail) {
      alert("Please provide friend email");
      return;
    }

    axios
      .post(`${SERVER_URL}/api/conversation`, {
        senderId: userId,
        receiverEmail: friendEmail,
      })
      .then((res) => {
        setRenderAgain(!renderAgain);
      })
      .catch((err) => {
        alert("Unable to get conversations");
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
    alert("Logged Out");
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      <div className="room">
        <div className="chatPersons">
          <div className="userInfo">
            <h1>Chats</h1>
            <h3>Name : {capitalizeFirstLetter(user?.username)}</h3>
            {/* <h3>UserId : {user?.userId}</h3> */}

            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="friendEmailInput"
              placeholder="Enter Friend Email"
            />
            <button className="addFriend" onClick={addFriend}>
              Add Friend
            </button>
            <button className="addFriend" onClick={logoutUser}>
              Logout
            </button>
          </div>
          <Conversations
            friendList={friendList}
            friendNumber={friendNumber}
            handleConversation={handleConversation}
          />
        </div>
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
            <h1>Select a Conversation</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
