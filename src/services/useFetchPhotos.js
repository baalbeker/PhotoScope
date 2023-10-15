import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetchPhotos(setPhotos, setLoading) {

  useEffect(() => {
    const photoCollection = collection(db, 'photoData');

    // Update the photos when changes occur
    const updatePhotos = (querySnapshot) => {
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
      console.log('app2');
    };

    // Add the snapshot listener to the collection
    const unsubscribe = onSnapshot(photoCollection, updatePhotos);

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [setPhotos, setLoading]);
}
