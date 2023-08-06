import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import UserContext from "../../UserContext";

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
  const { user } = useContext(UserContext);
  const chatBottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["messages", conversationId], () =>
    fetchMessage(conversationId)
  );

  useEffect(() => {
    setCurrentChat(data?.data?.messages);
    // console.log(data.data.messages);
  }, [data, setCurrentChat]);

  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }
  useEffect(() => {
    console.log(user);
  }, [user]);

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
      <div className="h-[12%] border-b-2 border-black sticky top-0 w-full flex flex-row items-center gap-6 bg-slate-200 rounded-tl-xl rounded-tr-xl">
        <span onClick={() => handleBack()} className="w-8 cursor-pointer">
          <BiLeftArrowAlt size={50} />
        </span>
        {}
        <span className="text-2xl">
          {friendList[friendNumber]?.name
            ? capitalizeFirstLetter(friendList[friendNumber].name)
            : ""}
        </span>
      </div>
      {isLoading ? (
        <div className="h-[78%] w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Chat chatBottomRef={chatBottomRef} currentChat={currentChat} />
      )}
      <div className="h-[10%] gap-2 p-1 flex flex-row border-t-2 border-t-black rounded-bl-xl rounded-br-xl sticky bottom-[-100%] left-0">
        <div
          role="textbox"
          contentEditable="true"
          type="text"
          className="inputMessage border-2 px-2 leading-6 border-black rounded-full outline-none w-[90%] overflow-y-scroll my-scroll-bar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></div>
        <div className="w-[10%] cursor-pointer" onClick={handleSend}>
          <AiOutlineSend className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
