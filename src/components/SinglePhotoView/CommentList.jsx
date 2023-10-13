import { useContext } from "react";
import { Button, Text, Flex, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { handleCommentLike, handleCommentDislike, deleteComment } from "../../services/photoServices";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import {AiOutlineLike,AiOutlineDislike} from "react-icons/ai"


const CommentList = ({ comments, photo }) => {
  const { userID, isAdmin } = useContext(AuthContext);

  return (
    <UnorderedList listStyleType="none">
      {comments.map((comment) => (
        <ListItem key={comment.id} id="commentbox" borderBottom="1px solid #ccc" py={2}>
          <Flex alignItems="center">
            <Text fontSize="md" fontWeight="bold" mr={2}>
              by @{comment.authorName}
            </Text>
            <Text fontSize="md">{comment.text}</Text>
          </Flex>

          <Flex alignItems="center" mt={2}>
            <Button
              size="sm"
              colorScheme="teal"
              mr={2}
              onClick={() => handleCommentLike(comment.id, photo.docRef, userID)}
              disabled={comment.likedBy && comment.likedBy.includes(userID)}
            >
            <AiOutlineLike/>
            <Text fontSize="md" fontWeight="bold">{comment.likes}</Text>
            </Button>

            <Button
              size="sm"
              colorScheme="red"
              ml={2}
              onClick={() => handleCommentDislike(comment.id, photo.docRef, userID)}
              disabled={comment.dislikedBy && comment.dislikedBy.includes(userID)}
            >
            <AiOutlineDislike/>
            <Text fontSize="md" fontWeight="bold">{comment.dislikes}</Text>
            </Button>

            {(userID === comment.authorId || isAdmin) && (
              <Button
                size="sm"
                colorScheme="red"
                ml={2}
                onClick={() => deleteComment(photo.docRef, comment.id)}
              >
                Delete
              </Button>
            )}

            {comment.createdAt && (
              <Box ml="10px">
                <Text fontSize="sm">
                  {comment.createdAt.toDate().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </Text>
                <Text fontSize="sm">
                  {comment.createdAt.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </Box>
            )}
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  photo: PropTypes.object.isRequired,
};

export default CommentList;
