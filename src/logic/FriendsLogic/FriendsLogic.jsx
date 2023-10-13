import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { FriendsContext } from "../../context/FriendsContext";

const FriendsLogic = () => {
  const { userDocID } = useContext(AuthContext);
  const { requests, setRequests, setFriends } = useContext(FriendsContext);
  const initialFocusRef = useRef();

  /**
Handles accepting a friend request.
@param {Object} request - The friend request to accept.
@returns {Promise<void>}
*/
  const handleAccept = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      let updatedFriends = [];
      if (userData.friends && Array.isArray(userData.friends)) {
        updatedFriends = [...userData.friends, request];
      } else {
        updatedFriends = [request];
      }

      const updatedRequests = requests.filter(
        (req) => req.userDocID !== request.userDocID
      );

      await updateDoc(userDocRef, {
        requests: updatedRequests,
        friends: updatedFriends,
      });

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
          },
        ];
      } else {
        updatedFriendFriends = [
          {
            name: userData.name,
            userDocID: userDocID,
          },
        ];
      }

      const updatedFriendData = {
        ...friendData,
        friends: updatedFriendFriends,
      };

      await updateDoc(friendDocRef, updatedFriendData);
      const updatedUserDoc = await getDoc(userDocRef);
      const updatedUserData = updatedUserDoc.data();

      const requestsData = updatedUserData?.requests || [];
      setRequests(requestsData);

      const friendsData = updatedUserData?.friends || [];
      const filteredFriends = [];

      for (const friend of friendsData) {
        const friendDocRef = doc(db, "users", friend.userDocID);
        const friendDoc = await getDoc(friendDocRef);
        const friendData = friendDoc.data();
        filteredFriends.push(friendData);
      }
      setFriends(filteredFriends);
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  };

  /**
Handles removing a friend.
@param {string} friendId - The ID of the friend to remove.
@returns {Promise<void>}
*/
  const handleRemoveFriend = async (friendId) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const updatedFriends = userData.friends.filter(
        (friend) => friend.userDocID !== friendId
      );

      await updateDoc(userDocRef, { friends: updatedFriends });

      const friendDocRef = doc(db, "users", friendId);
      const friendDoc = await getDoc(friendDocRef);
      const friendData = friendDoc.data();

      const updatedFriendFriends = friendData.friends.filter(
        (friend) => friend.userDocID !== userDocID
      );

      await updateDoc(friendDocRef, { friends: updatedFriendFriends });
      setFriends(updatedFriends);
    } catch (error) {
      console.log("Error removing friend:", error);
    }
  };

  /**
Handles declining a friend request.
@param {Object} request - The friend request to decline.
@returns {Promise<void>}
*/
  const handleDecline = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      await updateDoc(userDocRef, {
        requests: requests.filter((req) => req.userDocID !== request.userDocID),
      });
      setRequests(
        requests.filter((req) => req.userDocID !== request.userDocID)
      );
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
