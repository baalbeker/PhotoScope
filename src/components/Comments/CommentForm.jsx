import { useState, useContext } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { Box, Textarea, Button, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import quag from '../../assets/quag.mp3'


const CommentForm = ({ photo }) => {
  const [commentText, setCommentText] = useState('');
  const { isBlocked, userID, username } = useContext(AuthContext);

    const audio = new Audio(quag);
    const toggle = () => {
      audio.play();
    };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() === '') {
      toast.error('Please add a comment!');
      return;
    }
    const commentsCollectionRef = collection(db, `photoData/${photo.docRef}/comments`);
    try {
      await addDoc(commentsCollectionRef, {
        text: commentText,
        authorId: userID,
        authorName: username,
        createdAt: serverTimestamp(),
        dislikes: [],
        likes: []
      });
      toggle()
      setCommentText('');
      toast.success('Comment uploaded successfully')
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment. Please try again later.');
    }
  };

  return (
    <Box mt={3} className="commentform">
      {!isBlocked ? (
        <form onSubmit={handleCommentSubmit} className="formincomments">
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on mobile, row on desktop
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            minWidth={{ base: '30vh', md: '70vh' }} // Full width on mobile, 700px on desktop
            mx="auto"
          >
            <Textarea
              id="txtareacomments"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              resize="none"
              width="100%"
              mb={{ base: 3, md: 0 }} // Margin bottom on mobile only
            />
            <Button
              mt={{ base: 2, md: 0 }}
              ml={{ base: 0, md: 5 }}
              id="commentsubmitbutton"
              type="submit"
              colorScheme="twitter"
              width={{ base: '100%', md: 'auto' }} // Full width on mobile, auto on desktop
            >
              Add
            </Button>
          </Box>
        </form>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <Text>You are blocked and cannot post comments!</Text>
        </Alert>
      )}
      <ToastContainer position="top-center" style={{ zIndex: 2001}} />
    </Box>
  );
};

export default CommentForm;
