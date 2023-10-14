import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetchPhotos(setPhotos, setLoading) {

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoCollection = collection(db, 'photoData');
        const querySnapshot = await getDocs(photoCollection);

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
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [setPhotos, setLoading]);
}
