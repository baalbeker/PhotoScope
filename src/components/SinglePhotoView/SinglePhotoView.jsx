import { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Box,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import CommentForm from "../Comments/CommentForm";
import CommentList from "./CommentList";
import {
  handleLike,
  handleDislike,
  deletePhoto,
} from "../../services/photoServices";
import { AiFillLike, AiFillDislike, AiFillDelete } from "react-icons/ai";

const SinglePhotoView = ({ photo, onClose, setPhoto, setPhotos }) => {
  const { userID, userDocID, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsOpen(true);

    const fetchData = async () => {
      try {
        // Fetch likes and dislikes
        const photoRef = doc(db, "photoData", photo.docRef);
        const photoSnapshot = await getDoc(photoRef);
        if (photoSnapshot.exists()) {
          const photoData = photoSnapshot.data();
          setLikes(photoData.likes || 0);
          setDislikes(photoData.dislikes || 0);
        }

        // Fetch comments using onSnapshot for real-time updates
        const commentsCollectionRef = collection(
          db,
          `photoData/${photo.docRef}/comments`
        );
        const commentsQuery = query(commentsCollectionRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
          const newComments = [];
          querySnapshot.forEach((doc) => {
            newComments.push({ id: doc.id, ...doc.data() });
          });
          setComments(newComments);
        });

        // Return the unsubscribe function to clean up the listener when the component unmounts
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching photo data:", error);
      }
    };

    // Call fetchData on mount
    const unsubscribe = fetchData();

    return () => {
      // Cleanup: unsubscribe from comments listener
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [photo]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleLikePhoto = async () => {
    const updatedPhotoData = await handleLike(photo, userID);
    setPhoto((prevState) => ({
      ...prevState,
      likes: updatedPhotoData.likes,
      dislikes: updatedPhotoData.dislikes,
      likedBy: updatedPhotoData.likedBy || [],
      dislikedBy: updatedPhotoData.dislikedBy || [],
    }));
  };

  const handleDislikePhoto = async () => {
    const updatedPhotoData = await handleDislike(photo, userID);
    setPhoto((prevState) => ({
      ...prevState,
      likes: updatedPhotoData.likes,
      dislikes: updatedPhotoData.dislikes,
      likedBy: updatedPhotoData.likedBy || [],
      dislikedBy: updatedPhotoData.dislikedBy || [],
    }));
  };

  const deletePhotoHandler = async () => {
    await deletePhoto(photo, setPhotos, userDocID);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: "2xl", md: "4xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton size="lg" top={-0.5} right={-1} />
        <ModalBody>
          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <Image src={photo.url} alt={`Photo`} mt="7%" />
            <Flex justify="center">
              <Text fontWeight="bold" mr="40px">
                Uploader: @{photo.ownerName}
              </Text>
              {photo.createdAt && (
                <Flex>
                  <Text mr={"10px"} fontWeight="bold" fontSize="sm">
                    {photo.createdAt.toDate().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </Text>

                  <Text fontWeight="bold" fontSize="sm">
                    {photo.createdAt.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                </Flex>
              )}
            </Flex>

            <Flex alignItems="center" mt="2">
              <Button
                colorScheme="green"
                size="sm"
                mr="2"
                onClick={handleLikePhoto}
              >
                <AiFillLike />
                <Text fontWeight="bold">{likes}</Text>
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                mr="2"
                onClick={handleDislikePhoto}
              >
                <AiFillDislike />
                <Text fontWeight="bold">{dislikes}</Text>
              </Button>
              {(isAdmin || userDocID === photo.owner) && (
                <Button
                  colorScheme="red"
                  size="sm"
                  mr="2"
                  onClick={deletePhotoHandler}
                >
                  <AiFillDelete />
                </Button>
              )}
            </Flex>
            <CommentForm photo={photo} />
            <CommentList comments={comments} photo={photo} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SinglePhotoView;
