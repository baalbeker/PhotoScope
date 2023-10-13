import { db } from "../config/firebase";
import {doc,getDoc,updateDoc,increment,deleteDoc} from "firebase/firestore";
import { ref,deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

export const handleLike = async (photo, userID) => {
  const photoRef = doc(db, `photoData/${photo.docRef}`);
  const photoSnapshot = await getDoc(photoRef);
  const photoData = photoSnapshot.data();

  const alreadyLiked = photoData.likedBy.includes(userID);
  const alreadyDisliked = photoData.dislikedBy.includes(userID);

  if (alreadyLiked) {
    await updateDoc(photoRef, {
      likes: increment(-1),
      likedBy: photoData.likedBy.filter((id) => id !== userID),
    });
  } else {
    await updateDoc(photoRef, {
      likes: increment(1),
      likedBy: [...(photoData.likedBy || []), userID],
    });
  }

  if (alreadyDisliked) {
    await updateDoc(photoRef, {
      dislikes: increment(-1),
      dislikedBy: photoData.dislikedBy.filter((id) => id !== userID),
    });
  }

  const updatedPhotoSnapshot = await getDoc(photoRef);
  const updatedPhotoData = updatedPhotoSnapshot.data();

  return {
    likes: updatedPhotoData.likes,
    dislikes: updatedPhotoData.dislikes,
    likedBy: updatedPhotoData.likedBy || [],
    dislikedBy: updatedPhotoData.dislikedBy || [],
  };
};

export const handleDislike = async (photo, userID) => {
  const photoRef = doc(db, `photoData/${photo.docRef}`);
  const photoSnapshot = await getDoc(photoRef);
  const photoData = photoSnapshot.data();

  const alreadyLiked = photoData.likedBy.includes(userID);
  const alreadyDisliked = photoData.dislikedBy.includes(userID);

  if (alreadyDisliked) {
    await updateDoc(photoRef, {
      dislikes: increment(-1),
      dislikedBy: photoData.dislikedBy.filter((id) => id !== userID),
    });
  } else {
    await updateDoc(photoRef, {
      dislikes: increment(1),
      dislikedBy: [...(photoData.dislikedBy || []), userID],
    });
  }

  if (alreadyLiked) {
    await updateDoc(photoRef, {
      likes: increment(-1),
      likedBy: photoData.likedBy.filter((id) => id !== userID),
    });
  }

  const updatedPhotoSnapshot = await getDoc(photoRef);
  const updatedPhotoData = updatedPhotoSnapshot.data();

  return {
    likes: updatedPhotoData.likes,
    dislikes: updatedPhotoData.dislikes,
    likedBy: updatedPhotoData.likedBy || [],
    dislikedBy: updatedPhotoData.dislikedBy || [],
  };
};

export const deletePhoto = async (photo, setPhotos,userDocID) => {
  const photoRef = doc(db, `photoData/${photo.docRef}`);
  const fileRef = ref(storage, `${photo.fileName}`);
  const userRef = doc(db, `users/${userDocID}`);
  try {
    await deleteDoc(photoRef);
    await deleteObject(fileRef);
    await updateDoc(userRef, {photoCount: increment(-1)});
    setPhotos((prevState) =>
      prevState.filter((photoItem) => photoItem.docRef !== photo.docRef)
    );
    console.log("Photo deleted successfully.");
  } catch (error) {
    console.error("Error deleting photo: ", error);
  }
};


export const handleCommentLike = async (commentId,photoID,userID) => {
    const commentDocRef = doc(db, `photoData/${photoID}/comments/${commentId}`);
    const commentSnapshot = await getDoc(commentDocRef);
    const commentData = commentSnapshot.data();

    const alreadyLiked =commentData.likedBy && commentData.likedBy.includes(userID);
    const alreadyDisliked =commentData.dislikedBy && commentData.dislikedBy.includes(userID);

    if (alreadyLiked) {
        await updateDoc(commentDocRef, {
        likes: increment(-1),
        likedBy: commentData.likedBy.filter((id) => id !== userID),
        });
    } else {
        await updateDoc(commentDocRef, {
        likes: increment(1),
        likedBy: [...(commentData.likedBy || []), userID],
        });
    }

    if (alreadyDisliked) {
        await updateDoc(commentDocRef, {
        dislikes: increment(-1),
        dislikedBy: commentData.dislikedBy.filter((id) => id !== userID),
        });
    }
    };

export const handleCommentDislike = async (commentId,photoID,userID) => {
    const commentDocRef = doc(db, `photoData/${photoID}/comments/${commentId}`);
    const commentSnapshot = await getDoc(commentDocRef);
    const commentData = commentSnapshot.data();
    const alreadyLiked = commentData.likedBy && commentData.likedBy.includes(userID);
    const alreadyDisliked = commentData.dislikedBy && commentData.dislikedBy.includes(userID);

    if (alreadyDisliked) {
      await updateDoc(commentDocRef, {
        dislikes: increment(-1),
        dislikedBy: commentData.dislikedBy.filter((id) => id !== userID),
      });
    } else {
      await updateDoc(commentDocRef, {
        dislikes: increment(1),
        dislikedBy: [...(commentData.dislikedBy || []), userID],
      });
    }

    if (alreadyLiked) {
      await updateDoc(commentDocRef, {
        likes: increment(-1),
        likedBy: commentData.likedBy.filter((id) => id !== userID),
      });
    }
  };

  export const deleteComment = async (photoId, commentId) => {
    const commentRef = doc(db, `photoData/${photoId}/comments/${commentId}`);
    try {
      await deleteDoc(commentRef);
      console.log("Comment deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };


  