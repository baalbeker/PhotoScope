import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetchPhotos(setPhotos, setLoading) {

  useEffect(() => {
    const photoCollection = collection(db, 'photoData');

    const fetchPhotos = (querySnapshot) => {
      const photoData = querySnapshot.docs
        .filter((doc) => doc.data().fileName)
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => {
          const userComparison = (a.userId?.localeCompare(b.userId)) || 0;
          const timestampA = a.uploadTimestamp || '';
          const timestampB = b.uploadTimestamp || '';
          return userComparison !== 0 ? userComparison : timestampB.localeCompare(timestampA);
        });
      setPhotos(photoData);
      setLoading(false);
    };

    const unsubscribe = onSnapshot(photoCollection, fetchPhotos);
    return () => unsubscribe();

  }, [setPhotos, setLoading]);
}
