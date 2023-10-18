import { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { FriendsContext } from "../context/FriendsContext";
import userimage from "../assets/user.png"

function signUserOut(auth, navigate) {
  const {
    setIsAuth,
    setAdmin,
    setIsBlocked,
    setUserID,
    setUserDocID,
    setName,
    setFamily,
    setUsername,
    setEmail,
    setPhotoURL,
    setPassword,
    setPhotos,
    setSelectedPhoto,
    setPhotoCount,
  } = useContext(AuthContext);
  const {setRequests,setFriends} = useContext(FriendsContext)

  return () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("isAuth", false);
        setIsAuth(false);
        setEmail("");
        setAdmin(false);
        setIsBlocked(false);
        setUserID("");
        setUserDocID("");
        setName("");
        setFamily("");
        setUsername("");
        setEmail("");
        setPhotoURL(userimage);
        setPassword("");
        setFriends([]);
        setPhotoCount(0);
        setPhotos([]);
        setSelectedPhoto(null);
        setRequests([]);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
}

export default signUserOut;