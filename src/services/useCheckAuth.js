import { useEffect } from "react";
import userimage from "../assets/user.png"
import { auth } from "../config/firebase";

export const useCheckAuth = (setIsAuth, setPhotoURL, setUserID, photoURL) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setPhotoURL(user.photoURL || photoURL);
        setUserID(user.uid);
      } else {
        setIsAuth(false);
        setPhotoURL(userimage);
        setUserID("");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [photoURL]);
};
