import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  setIsAuth: () => {},

  isLoggedIn: false,
  setIsLoggedIn: () => {},

  isAdmin: false,
  setAdmin: () => {},

  signOut: () => {},

  isBlocked: "",
  setIsBlocked: () => {},

  userID: "",
  setUserID: () => {},
  
  userDocID: "",
  setUserDocID: () => {},

  name: "",
  setName: () => {},

  family: "",
  setFamily: () => {},

  username: "",
  setUsername: () => {},

  email: "",
  setEmail: () => {},

  photoURL: "",
  setPhotoURL: () => {},

  password: "",
  setPassword: () => {},

  photos: "",
  setPhotos: () => {},

  selectedPhoto: "",
  setSelectedPhoto: () => {},

  photoCount: "",
  setPhotoCount: () => {}
});

