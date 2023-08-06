import React, { useContext, useEffect, useState } from "react";
import AddFriend from "./AddFriend";
import axios from "axios";
import UserContext from "../../UserContext";

import { SERVER_URL } from "../..";
import Spinner from "../Spinner/Spinner";

const Friends = ({ friendList, handleConversation, setFriendList }) => {
  const { user } = useContext(UserContext);
  const [friendEmail, setFriendEmail] = useState("");
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleAddFriend = () => {
    const userId = user?.userId;

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
        setUpdate((prev) => !prev);
        setFriendEmail("");
        alert("Friend Added successfully");
      })
      .catch((err) => {
        setFriendEmail("");
        alert("Friendship unsuccessful");
      });
  };

  // Load Friend List
  useEffect(() => {
    if (!user) return;

    const getFriends = () => {
      setIsLoading(true);
      axios
        .get(`${SERVER_URL}/api/conversation/${user?.userId}`)
        .then((res) => {
          const data = res.data.friends;
          setIsLoading(false);
          setFriendList(data);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    getFriends();
  }, [user, setFriendList, update]);

  return (
    <div className="w-full h-full overflow-y-scroll  my-scroll-bar rounded-xl">
      <AddFriend
        handleAddFriend={handleAddFriend}
        friendEmail={friendEmail}
        setFriendEmail={setFriendEmail}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col py-2  w-full box-shadow-sm border-t-slate-900 bg-sky-300 h-full overflow-none">
          {friendList?.length > 0 &&
            friendList.map((friend, index) => (
              <div
                className=" font-semibold text-slate-600 cursor-pointer tracking-wide w-full h-[70px] flex items-center py-1 px-2 text-2xl border-2 rounded-lg border-sky-700"
                key={index}
                onClick={() => handleConversation(index)}
              >
                {capitalizeFirstLetter(friend?.name)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
