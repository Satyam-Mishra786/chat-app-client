import React, { useContext, useEffect, useState } from "react";
import AddFriend from "./AddFriend";
import axios from "axios";
import UserContext from "../../UserContext";

import { SERVER_URL } from "../..";
import Spinner from "../Spinner/Spinner";
import { useQuery } from "react-query";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchFriends = (userId) => {
  if (!userId) return;
  return axios.get(`${SERVER_URL}/api/conversation/${userId}`);
};

const Friends = ({ friendList, handleConversation, setFriendList }) => {
  const { user } = useContext(UserContext);
  const [friendEmail, setFriendEmail] = useState("");
  const [update, setUpdate] = useState(false);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const userId = user?.userId;

  const handleAddFriend = () => {
    if (!userId || !friendEmail) {
      toast.warning("Provide Valid Email !");
      return;
    }

    axios
      .post(`${SERVER_URL}/api/conversation`, {
        senderId: userId,
        receiverEmail: friendEmail,
      })
      .then((res) => {
        setUpdate((prev) => !prev);
        toast.success("Friend Added !");
      })
      .catch((err) => {
        toast.error("Friendship Unsuccessful");
      })
      .finally(() => {
        setFriendEmail("");
      });
  };

  const { data: friendsData, isLoading } = useQuery(["friends", userId], () =>
    fetchFriends(userId)
  );

  useEffect(() => {
    if (!friendsData) return;
    setFriendList(friendsData?.data?.friends);
  }, [friendsData, setFriendList, update]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full overflow-y-scroll  my-scroll-bar rounded-md">
        <AddFriend
          handleAddFriend={handleAddFriend}
          friendEmail={friendEmail}
          setFriendEmail={setFriendEmail}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-4/5 my-bg-gradient">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col py-2 overflow-y-scroll my-scroll-bar gap-1 px-2 w-full box-shadow-sm border-t-slate-900 my-bg-gradient h-4/5 overflow-none">
            {friendList?.length > 0 &&
              friendList?.map((friend, index) => (
                <div
                  className="font-semibold border-slate-300 border-[1px] bg-gradient-to-r from-cyan-600  to-sky-800 text-slate-100 cursor-pointer tracking-wide w-full min-h-[70px] h-[70px] flex items-center py-1 px-2 text-2xl rounded-lg"
                  key={index}
                  onClick={() => handleConversation(index)}
                >
                  {capitalizeFirstLetter(friend?.name)}
                </div>
              ))}
            {!friendList?.length > 0 && (
              <div className="text-xl h-full w-full text-green-900 flex flex-col justify-center items-center">
                <p>Add Friend 🙍‍♂️</p>
                <p>&</p>
                <p>Start Your Conversation 👋</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Friends;
