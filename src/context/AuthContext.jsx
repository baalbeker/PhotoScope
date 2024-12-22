// import { createContext } from "react";

// export const AuthContext = createContext({
//   isAuth: false,
//   setIsAuth: () => {},

//   isLoggedIn: false,
//   setIsLoggedIn: () => {},

//   isAdmin: false,
//   setAdmin: () => {},

//   signOut: () => {},

//   isBlocked: "",
//   setIsBlocked: () => {},

//   userID: "",
//   setUserID: () => {},

//   userDocID: "",
//   setUserDocID: () => {},

//   name: "",
//   setName: () => {},

//   family: "",
//   setFamily: () => {},

//   username: "",
//   setUsername: () => {},

//   email: "",
//   setEmail: () => {},

//   photoURL: "",
//   setPhotoURL: () => {},

//   password: "",
//   setPassword: () => {},

//   photos: "",
//   setPhotos: () => {},

//   selectedPhoto: "",
//   setSelectedPhoto: () => {},

//   photoCount: "",
//   setPhotoCount: () => {},

//   avatar: "",
//   setAvatar: () => {},

//   requests: "",
//   setRequests: () => {},

//   friends: "",
//   setFriends: () => {},
// });
import { createContext, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useCheckAuth } from "../services/useCheckAuth";
import { useFetchFriends } from "../services/useFetchFriends";
import { useFetchPhotos } from "../services/useFetchPhotos";
import { useFetchUser } from "../services/useFetchUser";
import SignOut from "../services/SignOut";
import userImage from "../assets/user.png";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
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

  const handleSignOut = () => SignOut(auth, navigate);

  // Fetch data and handle authentication
  useCheckAuth(setIsAuth, setPhotoURL, setUserID, photoURL, setAdmin);
  useFetchUser(userID, setIsBlocked, setAdmin, setUserDocID, setPhotoCount, setName, setFamily, setUsername, setEmail, setPassword, setAvatar);
  useFetchPhotos(setPhotos, setLoading);
  useFetchFriends(userDocID, setRequests, setFriends);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
