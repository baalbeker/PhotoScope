import { useEffect } from "react";
import { where, query, collection, onSnapshot} from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetchUser(userID,setIsBlocked,setAdmin,setUserDocID,setPhotoCount,setName,setFamily,setUsername,setEmail,setPassword) {

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("id", "==", userID));

    const updateUserData = (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.isBlocked === true) setIsBlocked(true);
        if (userData.role === 'admin') setAdmin(true);
        else setAdmin(false);
        setUserDocID(userData.docID);
        setPhotoCount(userData.photoCount);
        setName(userData.name);
        setFamily(userData.family);
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
      });
    };

    const unsubscribe = onSnapshot(userQuery, updateUserData);
    return () => unsubscribe();
    
  }, [userID, setIsBlocked, setAdmin, setUserDocID, setPhotoCount, setName, setFamily, setUsername, setEmail, setPassword]);
}