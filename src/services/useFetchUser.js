import { useEffect } from "react";
import { getDocs, where, query} from "firebase/firestore";

export function useFetchUser(usersCollection, userID,setIsBlocked,setAdmin,setUserDocID,setPhotoCount,setName,setFamily,setUsername,setEmail,setPassword) {

  useEffect(() => {
    const getUsers = async () => {
      const q = query(usersCollection, where("id", "==", userID));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.isBlocked === true) setIsBlocked(true);
        if (userData.role === 'admin') setAdmin(true);
        setUserDocID(userData.docID);
        setPhotoCount(userData.photoCount);
        setName(userData.name);
        setFamily(userData.family);
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
      });
      console.log('app3');
    };
    getUsers();
  }, [userID]);
}
