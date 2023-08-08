import React, { useContext } from "react";
import UserContext from "../../UserContext";

const Chat = ({ currentChat, chatBottomRef }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-b from-cyan-200 to-green-200 flex flex-col gap-1 w-full h-[78%] overflow-scroll my-scroll-bar">
      {currentChat?.length === 0 ? (
        <h2 className="text-slate-500">Start Conversation...</h2>
      ) : (
        <ul className="flex flex-col gap-1 p-2">
          {currentChat?.map((e, index) => {
            return e.msg?.length > 0 ? (
              <li
                className={
                  e.sendBy === user.userId
                    ? "chat-item bg-green-600 self-end"
                    : "chat-item self-start  bg-rose-500 "
                }
                key={index}
              >
                {e.msg}
              </li>
            ) : (
              <div></div>
            );
          })}
          <li ref={chatBottomRef}></li>
        </ul>
      )}
    </div>
  );
};

export default Chat;
