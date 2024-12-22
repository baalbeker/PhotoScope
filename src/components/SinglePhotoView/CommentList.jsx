import { useContext } from "react";
import { Button, Text, Flex, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { handleCommentLike, handleCommentDislike, deleteComment } from "../../services/photoServices";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import {AiFillLike,AiFillDislike,AiFillDelete } from "react-icons/ai"


const CommentList = ({ comments, photo }) => {
  const { userID, isAdmin } = useContext(AuthContext);

  return (
    <UnorderedList listStyleType="none">
      {comments.map((comment) => (
        <ListItem
          key={comment.id}
          id="commentbox"
          width="40vh"
          overflow-wrap="break-word"
          textAlign={"left"}
          wordBreak={"break-word"}
          minHeight={"10vh"}
          borderBottom="1px solid #ccc"
          py={2}>
          <Box alignItems="center">
            <Text fontSize="md" fontWeight="bold" mr={2}>
            @{comment.authorName}
            </Text>
            <Text fontSize="md">{comment.text}</Text>
          </Box>

          <Flex alignItems="center" mt={1}>

            <Button
                size="xs"
                colorScheme="green"
              onClick={() => handleCommentLike(comment.id, photo.docRef, userID)}
              disabled={comment.likedBy && comment.likedBy.includes(userID)}
            >
            <AiFillLike/>
            <Text fontSize="xsm" fontWeight="bold">{comment.likes}</Text>
            </Button>

            <Button
                size="xs"
                colorScheme="red"
              ml={2}
              onClick={() => handleCommentDislike(comment.id, photo.docRef, userID)}
              disabled={comment.dislikedBy && comment.dislikedBy.includes(userID)}
            >
            <AiFillDislike/>
            <Text fontSize="xsm" fontWeight="bold">{comment.dislikes}</Text>
            </Button>

            {(userID === comment.authorId || isAdmin) && (
              <Button
                size="xs"
                colorScheme="red"
                ml={2}
                onClick={() => deleteComment(photo.docRef, comment.id)}
              >
                <AiFillDelete />
              </Button>
            )}

            {comment.createdAt && (
              <Box  align={"center"} marginLeft="auto">
                <Text fontSize="xs">
                  {comment.createdAt.toDate().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </Text>
                <Text fontSize="xs">
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
