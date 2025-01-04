import { useState, useRef, useContext, useEffect } from "react";
import {
  ref,
  uploadBytes,
  updateMetadata,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Heading,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import imageCompression from "browser-image-compression";
import "react-toastify/dist/ReactToastify.css";
import alien from "../../assets/alien.gif";
import alienmusic from "../../assets/alienmusic.mp3";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { userID, userDocID, username, isBlocked } = useContext(AuthContext);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  const audioRef = useRef(null);
useEffect(() => {
  audioRef.current = new Audio(alienmusic);

  const playAudio = async () => {
    try {
      await audioRef.current.play();
    } catch (err) {
      console.error("Failed to play audio:", err);
    }
  };

  playAudio();

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
}, []);


  const handleUpload = async () => {
    try {
      if (!selectedFile) return;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(selectedFile, options);

      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
        now.getHours()
      ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
        now.getSeconds()
      ).padStart(2, "0")}`;

      const uniqueFileName = `${userID}_${timestamp}.png`;
      const fileRef = ref(storage, uniqueFileName);

      await uploadBytes(fileRef, compressedFile);

      await updateMetadata(fileRef, {
        customMetadata: {
          userId: userID,
          uploadTimestamp: timestamp,
        },
      });
      const downloadURL = await getDownloadURL(fileRef);

      const photoData = {
        owner: userDocID,
        ownerName: username,
        uploadTimestamp: timestamp,
        fileName: uniqueFileName,
        likes: 0,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
        url: downloadURL,
        createdAt: serverTimestamp(),
      };

      const photoCollection = collection(db, "photoData");
      const docRef = await addDoc(photoCollection, photoData);

      const documentId = docRef.path.split("/").pop();
      await updateDoc(docRef, { docRef: documentId });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error(`Error uploading photo: ${error.message}`);
    }
  };

  return (
    <Box maxW={{ base: "100%", sm: "400px", md: "500px" }} mx="auto">
      <Heading as="h1" size="lg" mb={4}>
        Качи нова снимка
      </Heading>
      {!isBlocked ? (
        <FormControl borderWidth="1px" borderRadius="md" p={4}>
          <FormLabel>Избери снимка</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            mb={4}
            w="100%"
          />
          {selectedFile && (
            <Box>
              <Text>Избрана снимка: {selectedFile.name}</Text>
              <Button
                colorScheme="blue"
                mt={2}
                onClick={handleUpload}
                width="100%"
              >
                Качи
              </Button>
            </Box>
          )}
        </FormControl>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <Text>Блокиран си и не можеш да качваш снимки!<br/>Моли Императора за прошка!</Text>
          
        </Alert>
      )}
      <ToastContainer position="top-center" style={{ zIndex: 2001 }} />
      <Box
        display="flex"
        justifyContent="center"
        position="fixed"
        bottom={0}
        left={{ base: "30", sm: "45", md: "60" }}
        right={0}
        mb={4}
        zIndex={999}
      >
        <img src={alien} alt="Alien gif" width="400" />
      </Box>
    </Box>
  );
}

export default Upload;
