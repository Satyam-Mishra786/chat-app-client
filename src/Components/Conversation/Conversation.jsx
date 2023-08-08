import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";

import { SERVER_URL } from "../..";
import Chat from "../Chat/Chat";
import Spinner from "../Spinner/Spinner";

import { useQuery } from "react-query";

const fetchMessage = (conversationId) => {
  return axios.get(`${SERVER_URL}/api/message/${conversationId}`);
};

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

  const { data, isLoading } = useQuery(["messages", conversationId], () =>
    fetchMessage(conversationId)
  );

  useEffect(() => {
    setCurrentChat(data?.data?.messages);
  }, [data, setCurrentChat]);

  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const scrollToBottom = () => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBack = async () => {
    setFriendNumber(null);
    navigate("/chat/friends");
  };
  useEffect(() => {
    if (friendNumber === null) {
      navigate("/chat/friends");
    }
  }, [friendNumber, navigate]);

  return (
    <div className="box-border w-full h-full relative rounded-xl my-scroll-bar">
      <div className="h-[12%] shadow-lg sticky top-0 w-full flex flex-row items-center gap-6 bg-gradient-to-b from-blue-300 to-green-400 rounded-tl-xl rounded-tr-xl">
        <span onClick={handleBack} className="w-8 cursor-pointer">
          <BiLeftArrowAlt size={50} />
        </span>
        <span className="text-2xl text-slate-100 text-shadow-lg shadow-indigo-500/50">
          {friendList[friendNumber]?.name
            ? capitalizeFirstLetter(friendList[friendNumber].name)
            : ""}
        </span>
      </div>
      {isLoading ? (
        <div className="h-[78%] w-full  flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Chat chatBottomRef={chatBottomRef} currentChat={currentChat} />
      )}
      <div className="h-[10%] gap-2 p-1 flex shadow-2xl flex-row bg-gradient-to-b from-blue-300 to-green-400 rounded-bl-xl rounded-br-xl ">
        <div
          role="textbox"
          contentEditable="true"
          type="text"
          className="inputMessage border-[1px] px-2 leading-6 border-slate-900 rounded-xl outline-none w-[90%] overflow-y-scroll my-scroll-bar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></div>
        <div className="w-[10%] cursor-pointer" onClick={handleSend}>
          <AiOutlineSend className="w-full h-full text-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
