import { createContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/user.png";
import { useFetchUser } from "../services/useFetchUser";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );
  const [isAdmin, setAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userID, setUserID] = useState("");
  const [userDocID, setUserDocID] = useState("");
  const [avatar, setAvatar] = useState(userImage);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(userImage);
  const [password, setPassword] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoCount, setPhotoCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [requests, setRequests] = useState([]);

  const handleSignOut = () => {
    firebaseSignOut(auth)
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
        setPhotoURL(userImage);
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", "true");  // Update localStorage
        setPhotoURL(user.photoURL || userImage);
        setUserID(user.uid);
      } else {
        setIsAuth(false);
        localStorage.setItem("isAuth", "false");  // Update localStorage
        setPhotoURL(userImage);
        setUserID("");
      }
    });
    return () => unsubscribe();
  }, [photoURL]);

  useFetchUser(
    userID,
    setIsBlocked,
    setAdmin,
    setUserDocID,
    setPhotoCount,
    setName,
    setFamily,
    setUsername,
    setEmail,
    setPassword,
    setAvatar
  );

  useEffect(() => {
    if (!userID) return;

    const photoCollection = collection(db, "photoData");

    const fetchPhotos = (querySnapshot) => {
      console.log("fetch photos");

      const photoData = querySnapshot.docs
        .filter((doc) => doc.data().fileName)
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => {
          const userComparison = a.userId?.localeCompare(b.userId) || 0;
          const timestampA = a.uploadTimestamp || "";
          const timestampB = b.uploadTimestamp || "";
          return userComparison !== 0
            ? userComparison
            : timestampB.localeCompare(timestampA);
        });

      setPhotos(photoData);
      setLoading(false);
    };

    setLoading(true);
    const unsubscribe = onSnapshot(photoCollection, fetchPhotos);

    return () => unsubscribe();
  }, [userID]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin,
        setAdmin,
        signOut: handleSignOut,
        isBlocked,
        setIsBlocked,
        userID,
        setUserID,
        name,
        setName,
        family,
        setFamily,
        username,
        setUsername,
        email,
        setEmail,
        photoURL,
        setPhotoURL,
        password,
        setPassword,
        userDocID,
        setUserDocID,
        photos,
        setPhotos,
        selectedPhoto,
        setSelectedPhoto,
        photoCount,
        setPhotoCount,
        avatar,
        setAvatar,
        requests,
        setRequests,
        friends,
        setFriends,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
