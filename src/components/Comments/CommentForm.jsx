import { useState, useContext } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { Box, Textarea, Button, Alert, AlertIcon,Text } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentForm = ({ photo }) => {
  const [commentText, setCommentText] = useState('');
  const { isBlocked, userID, username } = useContext(AuthContext);

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
        <form style={{ marginLeft: "50px", width: "500px", display: 'flex', flexDirection: 'row' }} className="formincomments" onSubmit={handleCommentSubmit}>
          <Textarea
            id="txtareacomments"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            
          />
          <Button mt={4} ml={5} id="commentsubmitbutton" type="submit" colorScheme="twitter">Add</Button>
        </form>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <Text>You are blocked and cannot post comments!</Text>
        </Alert>
      )}
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </Box>
  );
};

export default CommentForm;
