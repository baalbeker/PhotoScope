import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Avatar,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import defaultAvatar from "../../assets/user.png";
import { FiMoreVertical } from "react-icons/fi";
import imageCompression from "browser-image-compression";

const Chat = () => {
  const { userDocID, username, avatar } = useContext(AuthContext);
  const { recipientDocID } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState({
    username: "",
    avatar: defaultAvatar,
  });
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.800" : "white";
  const messagesEndRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!recipientDocID) return;

    const fetchRecipient = async () => {
      const recipientDocRef = doc(db, "users", recipientDocID);
      const recipientDocSnap = await getDoc(recipientDocRef);

      if (recipientDocSnap.exists()) {
        const recipientData = recipientDocSnap.data();
        setRecipient({
          username: recipientData.username || "No name",
          avatar: recipientData.avatar || defaultAvatar,
        });
      }
    };

    fetchRecipient();
  }, [recipientDocID]);

  useEffect(() => {
    if (!userDocID || !recipientDocID) return;

    const chatID =
      userDocID < recipientDocID
        ? `${userDocID}_${recipientDocID}`
        : `${recipientDocID}_${userDocID}`;
    const messagesRef = collection(db, "chats", chatID, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [userDocID, recipientDocID]);

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  const sendMessage = async (imageURL = null) => {
    if (!newMessage.trim() && !imageURL) return;

    const chatID =
      userDocID < recipientDocID
        ? `${userDocID}_${recipientDocID}`
        : `${recipientDocID}_${userDocID}`;
    const messagesRef = collection(db, "chats", chatID, "messages");
    await addDoc(messagesRef, {
      sender: userDocID,
      senderAvatar: avatar,
      text: newMessage.trim(),
      image: imageURL || null,
      timestamp: new Date().toISOString(),
    });
    setNewMessage("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1, // 1MB maximum size after compression
        maxWidthOrHeight: 800, // Maximum width or height of the image
        useWebWorker: true, // Enable web workers for faster processing
      };
      const compressedFile = await imageCompression(file, options);

      const chatID =
        userDocID < recipientDocID
          ? `${userDocID}_${recipientDocID}`
          : `${recipientDocID}_${userDocID}`;
      const storage = getStorage();
      const storageRef = ref(storage, `chats/${chatID}/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const imageURL = await getDownloadURL(storageRef);
      sendMessage(imageURL);
    } catch (error) {
      console.error("Error compressing or uploading the image:", error);
    }
  };

  const handleDeleteMessage = async (messageID) => {
    const chatID =
      userDocID < recipientDocID
        ? `${userDocID}_${recipientDocID}`
        : `${recipientDocID}_${userDocID}`;
    const messageDocRef = doc(db, "chats", chatID, "messages", messageID);
    await deleteDoc(messageDocRef);
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const diffDays = Math.floor(
      (currentDate - messageDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 1) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays < 7) {
      return `${messageDate.toLocaleDateString([], {
        weekday: "short",
      })} ${messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return messageDate.toLocaleString([], {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const renderMenu = (message) => (
    <Menu>
      <MenuButton
        size="xsm"
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        aria-label="Options"
      />
      <MenuList>
        <MenuItem
          bg="transparent"
          onClick={() => handleDeleteMessage(message.id)}
        >
          Delete Message
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box
      w="100%"
      h="90vh"
      mt={14}
      p={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box flex="1" overflowY="auto" maxWidth={{ base: "100%", md: "600px" }}>
        {messages.map((message) => (
          <Flex
            key={message.id}
            direction={message.sender === userDocID ? "row-reverse" : "row"}
            align="flex-start"
            mb={4}
          >
            <Avatar
              src={message.sender === userDocID ? avatar : recipient.avatar}
              name={
                message.sender === userDocID ? username : recipient.username
              }
              size="xs"
              mr={2}
              ml={2}
            />
            <Box maxWidth="70%">
              <Flex
                align="center"
                justify={
                  message.sender === userDocID ? "flex-end" : "flex-start"
                }
                mb={2}
              >
                <Text fontWeight="bold" fontSize="sm" color="gray.500">
                  {message.sender === userDocID ? username : recipient.username}
                </Text>
                <Text fontSize="xs" color="gray.500" ml={2}>
                  {formatTimestamp(message.timestamp)}
                </Text>
                <Flex>{renderMenu(message)}</Flex>
              </Flex>
              {message.text && (
                <Box
                  p={2}
                  bg={
                    message.sender === userDocID ? "linkedin.300" : "gray.200"
                  }
                  borderRadius="md"
                  wordBreak="break-word"
                  color="black"
                >
                  {message.text}
                </Box>
              )}
              {message.image && (
                <Box
                  mt={2}
                  onClick={() => {
                    setSelectedImage(message.image);
                    onOpen();
                  }}
                >
                  <img
                    src={message.image}
                    alt="Sent"
                    style={{ maxWidth: "100%", cursor: "pointer" }}
                  />
                </Box>
              )}
            </Box>
          </Flex>
        ))}
        <div ref={messagesEndRef}></div>
      </Box>

      <Flex align="center" mt={4} w="100%" justifyContent="center">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          borderRadius="20px"
          bg={bg}
          flex="1"
          mr={3}
          p={4}
          maxWidth="400px"
        />
        <IconButton
          icon={<FiImage />}
          onClick={() => document.getElementById("imageUpload").click()}
          colorScheme="blue"
          borderRadius="10px"
          mr={3}
        />
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          display="none"
        />
        <Button
          onClick={() => sendMessage()}
          colorScheme="twitter"
          borderRadius="10px"
          h="100%"
        >
          Send
        </Button>
      </Flex>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background="transparent" boxShadow="none" p={0} m={0}>
          <ModalCloseButton
            position="absolute"
            top="10px"
            right="10px"
            zIndex={2}
            color="white"
            bg="blackAlpha.600"
            _hover={{ bg: "blackAlpha.800" }}
            borderRadius="full"
          />
          <Image src={selectedImage} alt="Enlarged" objectFit="contain" />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chat;
