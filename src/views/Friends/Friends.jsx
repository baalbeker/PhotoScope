import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import FriendsLogic from "../../logic/FriendsLogic";
import userimage from "../../assets/user.png";
import goalheader from "../../assets/img5.jpg";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spinner,
  Popover,
  Divider,
  Avatar,
  Grid,
  GridItem,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillPersonXFill } from "react-icons/bs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";


const Friends = () => {
  const { userDocID, friends, setFriends, requests, setRequests } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleAccept,
    handleRemoveFriend,
    initialFocusRef,
    handleDecline,
    bg,
  } = FriendsLogic();

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const userDocRef = doc(db, "users", userDocID); //current logged in user
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData) {
          const requestsData = userData.requests || [];
          setRequests(requestsData);

          const friendsData = userData.friends || []; //the array of friends of the user
          const friendPromises = friendsData.map(async (friend) => {
            const friendDocRef = doc(db, "users", friend.userDocID);
            const friendDocSnapshot = await getDoc(friendDocRef);
            const friendData = friendDocSnapshot.data();
            return friendData;
          });
          const friendResults = await Promise.all(friendPromises);
          setFriends(friendResults);
          console.log("friends fetch");
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFriends();
  }, [userDocID, setRequests, setFriends]);



  const navigate = useNavigate();
  const handleChat = (recipientDocID) => {
    navigate(`/chat/${recipientDocID}`);
  };
  
  const gridColumns = useBreakpointValue({ base: "1fr", md: "repeat(3, 1fr)" });
  const friendTextFontSize = useBreakpointValue({ base: "14px", md: "lg" });
  const friendButtonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const textColor = useColorModeValue("gray.800", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box w="100%" h="100vh" mt={8} p={5} bg={bg}>
      <Grid
        templateRows="repeat(3, auto)"
        templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
        gap={4}
      >
        <GridItem
          colSpan={5}
          rowSpan={1}
          rounded="md"
          borderColor="gray.50"
          bgImage={goalheader}
          bgSize="cover"
          h={{ base: "10vh", md: "15vh" }}
          p={6}
        >
          <Text
            mt={{ base: "1", md: "3vh" }}
            fontSize="25px"
            fontWeight="bold"
            color="white"
          >
            Приятели
          </Text>
        </GridItem>

        <GridItem colSpan={{ base: 5, md: 5 }}>
          <Divider mt={5} orientation="horizontal" />
          <Box mt={3} align="center">
            <Text
              fontSize={friendTextFontSize}
              fontWeight="bold"
              color={textColor}
            >
              Покани
            </Text>
            {requests.length < 1 ? (
              <Text fontSize={friendTextFontSize} color={textColor}>
                Няма покани за приятелство
              </Text>
            ) : (
              requests.map((request) => (
                <Popover
                  key={request.userDocID}
                  initialFocusRef={initialFocusRef}
                  placement="bottom"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Button
                      bgColor="blue.500"
                      p={4}
                      mt={3}
                      size={friendButtonSize}
                    >
                      {request.name} иска да бъдете приятели.
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      {request.name} {request.family}
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody fontSize={friendTextFontSize}>
                      Искаш ли да бъдем приятели?
                    </PopoverBody>
                    <PopoverFooter
                      border="0"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      pb={4}
                    >
                      <ButtonGroup size="sm">
                        <Button
                          onClick={() => handleAccept(request)}
                          ref={initialFocusRef}
                          colorScheme="whatsapp"
                        >
                          Приеми
                        </Button>
                        <Button
                          onClick={() => handleDecline(request)}
                          colorScheme="red"
                        >
                          Откажи
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ))
            )}
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 5, md: 5 }}>
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" h="200px">
              <Spinner size="xl" />
            </Flex>
          ) : friends.length > 0 ? (
            <Grid templateColumns={gridColumns} gap={4} mb={5}>
              {friends.map((user, index) =>
                user ? (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="sm"
                    textAlign="center"
                    bg={cardBg}
                    position="relative"
                  >
                    <Button
                      position="absolute"
                      top="10px"
                      right="10px"
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleRemoveFriend(user.docID)}
                    >
                      <Box
                        as={BsFillPersonXFill}
                        width="20px"
                        height="20px"
                      />
                    </Button>
                    <Avatar
                      size="lg"
                      src={user.avatar ? user.avatar : userimage}
                      mb={4}
                    />
                    <Text
                      fontSize={friendTextFontSize}
                      fontWeight="bold"
                      color={textColor}
                    >
                      {user.name} {user.family}
                    </Text>
                    <Text fontSize={friendTextFontSize} color={textColor}>
                      {user.username}
                    </Text>
                    <Text fontSize={friendTextFontSize} color="gray.500">
                      {user.email}
                    </Text>
                    <Button
                      mt={3}
                      size="md"
                      colorScheme="green"
                      variant="solid"
                      onClick={() => handleChat(user.docID)}
                    >
                      Chat
                    </Button>
                  </Box>
                ) : null
              )}
            </Grid>
          ) : (
            <Heading
              as="div"
              mt={10}
              textAlign="center"
              fontSize={friendTextFontSize}
              color={textColor}
            >
              Вашият списък с приятели е празен.
            </Heading>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Friends;
