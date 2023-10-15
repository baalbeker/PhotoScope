import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { FriendsContext } from "../context/FriendsContext";
import userimage from "../assets/user.png"


function signUserOut(auth, navigate) {
  const {
    setIsAuth,
    setAdmin, // Make sure to include these if they are part of your context
    setIsBlocked, // Include these as needed
    setUserID, // Include these as needed
    setUserDocID, // Include these as needed
    setName, // Include these as needed
    setFamily, // Include these as needed
    setUsername, // Include these as needed
    setEmail, // Include these as needed
    setPhotoURL, // Include these as needed
    setPassword, // Include these as needed
    setPhotos, // Include these as needed
    setSelectedPhoto, // Include these as needed
    setPhotoCount, // Include these as needed
  } = useContext(AuthContext);
  const {setRequests,setFriends} = useContext(FriendsContext)

  return () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("isAuth", false);
        setIsAuth(false);
        setEmail("");
        setAdmin(false); // Reset admin state if necessary
        setIsBlocked(false); // Reset blocked state if necessary
        setUserID("");
        setUserDocID("");
        setName("");
        setFamily("");
        setUsername("");
        setEmail("");
        setPhotoURL(userimage); // You need to define userimage
        setPassword("");
        setFriends([]); // Reset friends array if necessary
        setPhotoCount(0); // Reset photoCount if necessary
        setPhotos([]); // Reset photos array if necessary
        setSelectedPhoto(null);
        setRequests([]); // Reset requests array if necessary
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
}

export default signUserOut;