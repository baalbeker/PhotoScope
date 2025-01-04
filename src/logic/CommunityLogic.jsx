import { db, storage } from "../config/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import defaultavatar from "../assets/user.png";
import { deleteObject,ref } from "firebase/storage";


const CommunityLogic = (setUserList) => {
  const { userDocID, name, family, email, username, avatar } =
    useContext(AuthContext);


  const handleDeleteUser = async (userId) => {
    try {
      // Fetch all user documents
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      // Iterate over each user document
      for (const userDoc of usersSnapshot.docs) {
        const userDocRef = doc(db, "users", userDoc.id);
        const userData = userDoc.data();
        // Clean up 'friends' subcollection
        if (userData.friends) {
          const updatedFriends = userData.friends.filter(
            (friend) => friend.userDocID !== userId
          );
          if (updatedFriends.length !== userData.friends.length) {
            await updateDoc(userDocRef, { friends: updatedFriends });
          }
        }
        // Clean up 'requests' subcollection
        if (userData.requests) {
          const updatedRequests = userData.requests.filter(
            (request) => request.userDocID !== userId
          );
          if (updatedRequests.length !== userData.requests.length) {
            await updateDoc(userDocRef, { requests: updatedRequests });
          }
        }
      }
      const userPhoto = `${userId}.png`;
      console.log(userPhoto);
      
      deleteObject(ref(storage,userPhoto))
      // Finally, delete the user's document
      await deleteDoc(doc(db, "users", userId));
      // Update the user list in the UI
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user.id !== userId)
      );
      console.log(`User ${userId} and their references were successfully deleted.`);
    } catch (error) {
      console.error("Error deleting user and their references:", error);
    }
  };
  
  


  const handleBlockUser = async (userId) => {
    const data = { isBlocked: true };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, isBlocked: true } : user
      )
    );
  };

  const handleUnblockUser = async (userId) => {
    const data = { isBlocked: null };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, isBlocked: false } : user
      )
    );
  };

  const handleFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();

    const userAvatar = avatar || defaultavatar;
    const updatedFriends = target.requests || [];

    if (updatedFriends.some((friend) => friend.userDocID === userDocID)) {
      return;
    }

    updatedFriends.push({
      userDocID,
      name,
      family,
      email,
      username,
      avatar: userAvatar,
    });

    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);

    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, requests: updatedFriends } : user
      )
    );
  };

  const handleCancelFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();

    if (!target || !target.requests) return;

    const updatedFriends = target.requests.filter(
      (friend) => friend.userDocID !== userDocID
    );
    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, requests: updatedFriends } : user
      )
    );
  };

  return {
    handleDeleteUser,
    handleBlockUser,
    handleUnblockUser,
    handleFriendRequest,
    handleCancelFriendRequest,
  };
};

export default CommunityLogic;
