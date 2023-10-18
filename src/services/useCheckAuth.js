import { useEffect } from "react";
import userimage from "../assets/user.png"
import { auth } from "../config/firebase";

export const useCheckAuth = (setIsAuth, setPhotoURL, setUserID, photoURL,setAdmin) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setPhotoURL(user.photoURL || photoURL);
        setUserID(user.uid);
      } else {
        setAdmin(false)
        setIsAuth(false);
        setPhotoURL(userimage);
        setUserID("");
      }
    });
    return () => unsubscribe();
    
  }, [photoURL]);
};
