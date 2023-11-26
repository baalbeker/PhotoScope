import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetchFriends(userDocID, setRequests, setFriends) {
  
  useEffect(() => {

    const fetchData = async () => {
      if (userDocID) {
        try {
          const userDocRef = doc(db, "users", userDocID);
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();

          if (userData) {
            const requestsData = userData.requests || [];
            setRequests(requestsData);

            const friendsData = userData.friends || [];
            const friendPromises = friendsData.map(async (friend) => {
              const friendDocRef = doc(db, "users", friend.userDocID);
              const friendDocSnapshot = await getDoc(friendDocRef);
              const friendData = friendDocSnapshot.data();
              return friendData;
            });
            const friendResults = await Promise.all(friendPromises);
            setFriends(friendResults);
            console.log('friends fetch');
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [userDocID, setRequests, setFriends]);
}
