import { useState, useContext } from 'react';
import { ref, uploadBytes, updateMetadata, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { db } from "../../config/firebase";
import { addDoc, collection, updateDoc,doc,increment,serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import {Box,Heading,Button,Input,Text,FormControl,FormLabel,} from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userID,userDocID,username,photoCount } = useContext(AuthContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (photoCount >= 10) {
        toast.error('Photo upload limit reached (10 photos max).');
        return;
      }
      
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(
        now.getHours()
      ).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(
        now.getSeconds()
      ).padStart(2, '0')}`;

      const uniqueFileName = `${userID}_${timestamp}.png`;
      const fileRef = ref(storage, uniqueFileName);
      await uploadBytes(fileRef, selectedFile);
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

      const userRef = doc(db, `users/${userDocID}`);
      await updateDoc(userRef, { photoCount: increment(1) });

      const photoCollection = collection(db, "photoData");
      const docRef = await addDoc(photoCollection, photoData);
      
      const documentId = docRef.path.split('/').pop();
      await updateDoc(docRef, { docRef: documentId });

      toast.success('Photo uploaded successfully!')
    } catch (error) {
      toast.error('Error uploading photo:', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h1" size="lg" mb={4}>
        Upload a new photo
      </Heading>
      <FormControl>
        <FormLabel>Select a Photo</FormLabel>
        <Input type="file" accept="image/*" onChange={handleFileChange} mb={4} />
        {selectedFile && (
          <Box>
            <Text>Selected File: {selectedFile.name}</Text>
            <Button colorScheme="blue" mt={2} onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        )}
      </FormControl>
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </Box>
  );
}

export default Upload;