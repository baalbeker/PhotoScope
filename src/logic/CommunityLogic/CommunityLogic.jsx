import { db } from "../../config/firebase";
import {getDocs,collection,query,where,deleteDoc,doc,updateDoc,getDoc,} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useColorMode } from "@chakra-ui/react";

const CommunityLogic = () => {
  const { userDocID, name, family, email, username } = useContext(AuthContext);
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const { colorMode } = useColorMode();
  const [sortConfig, setSortConfig] = useState(null);
  const bg = colorMode === "dark" ? "gray.800" : "white";

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);
  const handleSearchTypeChange = (event) => setSearchType(event.target.value);

  useEffect(() => {

    const getUsers = async () => {
      let q;
      if (searchTerm.trim() !== "") {
        if (searchType === "name") {
          q = query(usersCollection, where("name", "==", searchTerm));
        } else if (searchType === "email") {
          q = query(usersCollection, where("email", "==", searchTerm));
        } else if (searchType === "username") {
          q = query(usersCollection, where("username", "==", searchTerm));
        }
      } else {
        q = query(usersCollection);
      }
      const data = await getDocs(q);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      let sortedUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      if (sortConfig !== null) {
        sortedUsers.sort((a, b) => {
          if (a[sortConfig.field] < b[sortConfig.field]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.field] > b[sortConfig.field]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      setUserList(sortedUsers);
    };

    getUsers();
  }, [searchTerm, searchType, sortConfig,usersCollection]);

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(usersCollection, userId));
    setUserList(userList.filter((user) => user.id !== userId));
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
        user.id === userId ? { ...user, isBlocked: null } : user
      )
    );
  };

  const handleFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();
    const updatedFriends = target.requests || [];

    if (updatedFriends.some((friend) => friend.userDocID === userDocID)) {
      return;
    }
    updatedFriends.push({ userDocID, name, family, email, username });
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

    const updatedFriends = target.requests.filter((friend) => friend.userDocID !== userDocID);

    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, requests: updatedFriends } : user
      )
    );
  };

  const onSort = (field) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.field === field &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ field, direction });
  };

  return {
    userList,
    searchTerm,
    searchType,
    sortConfig,
    bg,
    handleSearchTermChange,
    handleSearchTypeChange,
    handleDeleteUser,
    handleBlockUser,
    handleUnblockUser,
    handleFriendRequest,
    handleCancelFriendRequest,
    onSort,
  };
};
export default CommunityLogic;
