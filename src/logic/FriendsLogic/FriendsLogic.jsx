import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { FriendsContext } from "../../context/FriendsContext";

const FriendsLogic = () => {
  const { userDocID } = useContext(AuthContext);
  const { requests, setRequests, setFriends } = useContext(FriendsContext);
  const initialFocusRef = useRef();

  const handleAccept = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      let updatedFriends = [];
      if (userData.friends) updatedFriends = [...userData.friends, request];
      else updatedFriends = [request];

      const updatedRequests = requests.filter((req) => req.userDocID !== request.userDocID);
      await updateDoc(userDocRef, {requests: updatedRequests,friends: updatedFriends});
      setFriends(updatedFriends);
      setRequests(updatedRequests);

      const friendDocRef = doc(db, "users", request.userDocID);
      const friendDoc = await getDoc(friendDocRef);
      const friendData = friendDoc.data();

      let updatedFriendFriends = [];
      if (friendData.friends && Array.isArray(friendData.friends)) {
        updatedFriendFriends = [
          ...friendData.friends,
          {
            name: userData.name,
            userDocID: userDocID,
            username: userData.username,
            email: userData.email,
          },
        ];
      } else {
        updatedFriendFriends = [
          {
            name: userData.name,
            userDocID: userDocID,
            username: userData.username,
            email: userData.email,
          },
        ];
      }

      const updatedFriendData = {
        ...friendData,
        friends: updatedFriendFriends,
      };
      await updateDoc(friendDocRef, updatedFriendData);
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const updatedFriends = userData.friends.filter((friend) => friend.userDocID !== friendId);
      await updateDoc(userDocRef, { friends: updatedFriends });
      setFriends(updatedFriends);

      const friendDocRef = doc(db, "users", friendId);
      const friendDoc = await getDoc(friendDocRef);
      const friendData = friendDoc.data();

      const updatedFriendFriends = friendData.friends.filter((friend) => friend.userDocID !== userDocID);
      await updateDoc(friendDocRef, { friends: updatedFriendFriends });
    } catch (error) {
      console.log("Error removing friend:", error);
    }
  };

  const handleDecline = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      await updateDoc(userDocRef, {requests: requests.filter((req) => req.userDocID !== request.userDocID)});
      setRequests((prevRequests) =>prevRequests.filter((req) => req.userDocID !== request.userDocID));
    } catch (error) {
      console.log("Error declining request:", error);
    }
  };

  return {
    handleAccept,
    handleRemoveFriend,
    initialFocusRef,
    handleDecline,
  };
};

export default FriendsLogic;
