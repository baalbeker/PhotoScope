import { db } from "../../config/firebase";
import {getDocs,collection,query,where,deleteDoc,doc,updateDoc,getDoc,} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useColorMode } from "@chakra-ui/react";

const CommunityLogic = () => {
  const { userDocID, name, family } = useContext(AuthContext);
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const { colorMode } = useColorMode();
  const [sortConfig, setSortConfig] = useState(null);

  const bg = colorMode === "dark" ? "gray.800" : "white";

  /**
  Handles the change event for the search term input.
  @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
  */
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
  Handles the change event for the search type input.
  @param {React.ChangeEvent<HTMLSelectElement>} event - The change event.
  */
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  useEffect(() => {
    /**
     Fetches the users from the database based on the search term and type.
     @returns {Promise<void>}
     */
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
  }, [searchTerm, searchType, sortConfig]);

  /**

Deletes a user from the database and updates the user list.
@param {string} userId - The ID of the user to delete.
@returns {Promise<void>}
*/
  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(usersCollection, userId));
    setUserList(userList.filter((user) => user.id !== userId));
  };

  /**

Blocks a user and updates the user list.
@param {string} userId - The ID of the user to block.
@returns {Promise<void>}
*/
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

  /**

Unblocks a user and updates the user list.
@param {string} userId - The ID of the user to unblock.
@returns {Promise<void>}
*/
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

  /**

Sends a friend request to a user and updates the user list.
@param {string} userId - The ID of the user to send a friend request to.
@returns {Promise<void>}
*/
  const handleFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();
    const updatedFriends = target.requests || [];

    if (updatedFriends.some((friend) => friend.userDocID === userDocID)) {
      return;
    }
    updatedFriends.push({ userDocID, name, family });
    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.id === userId ? { ...user, requests: updatedFriends } : user
      )
    );
  };

  /**

Cancels a friend request sent to a user and updates the user list.
@param {string} userId - The ID of the user to cancel the friend request.
@returns {Promise<void>}
*/
  const handleCancelFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();

    if (!target || !target.requests) {
      return;
    }

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

  /**

Handles the sorting of users based on the field.
@param {string} field - The field to sort by.
@returns {void}
*/
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
