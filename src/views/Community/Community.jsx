import { useContext, useState, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  Text,
  Tooltip,
  Spinner,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import {
  BsFillPersonCheckFill,
  BsFillPersonPlusFill,
  BsFillPersonXFill,
} from "react-icons/bs";
import CommunityLogic from "../../logic/CommunityLogic";
import goalheader from "../../assets/img5.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useColorMode } from "@chakra-ui/react";

const Community = () => {
  const { userDocID, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.800" : "white";

  const {
    handleDeleteUser,
    handleBlockUser,
    handleUnblockUser,
    handleFriendRequest,
    handleCancelFriendRequest,
  } = CommunityLogic(setUserList);


  useEffect(() => {
  
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersCollection = collection(db, "users");
        console.log("community fetch");
  
        let q;
        if (searchTerm.trim() !== "") {
          if (searchType === "name") {
            q = query(usersCollection, where("name", "==", searchTerm));
          } else if (searchType === "email") {
            q = query(usersCollection, where("email", "==", searchTerm));
          } else if (searchType === "username") {
            q = query(usersCollection, where("username", "==", searchTerm));
          }
        } else {
          q = query(usersCollection);
        }
  
        const data = await getDocs(q);        
        setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUsers();
  }, [searchTerm, searchType]);
  

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);
  const handleSearchTypeChange = (event) => setSearchType(event.target.value);

  const userPhotos = (id) => navigate(`/user/${id}`);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" thickness="6px" speed="0.65s" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box w="100%" mt={10} h="100vh" p={4}>
      <Container maxW="container.lg" centerContent>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
          w="100%"
        >
          {/* Header Section */}
          <GridItem
            colSpan={2}
            rounded="md"
            borderColor="gray.50"
            bgImage={goalheader}
            bgSize="cover"
            h={{ base: "10vh", md: "15vh" }}
            p={6}
          >
            <Text mt={{ base: "1", md: "3vh" }} fontSize="25px" fontWeight="bold" color="white">
              Потребители
            </Text>
          </GridItem>

          {/* Search Section */}
          <GridItem colSpan={2} bgColor={bg} rounded="md">
            <FormControl mb={2}>
              <FormLabel htmlFor="searchType" fontWeight="bold" fontSize="sm">
                Search by:
              </FormLabel>
              <Select
                id="searchType"
                value={searchType}
                onChange={handleSearchTypeChange}
                bg="bg"
                size="sm"
              >
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="email">Email</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="searchTerm"
                fontWeight="bold"
                fontSize="sm"
                mb={2}
              >
                Search term:
              </FormLabel>
              <Input
                className="inputt"
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={handleSearchTermChange}
                bg={bg}
                borderRadius="sm"
                borderColor="gray.300"
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                _placeholder={{ color: "gray.400" }}
                size="sm"
              />
            </FormControl>
          </GridItem>

          {/* Users Table Section */}
          <GridItem colSpan={2} bgColor={bg} rounded="md">
            {userList.map((user) => (
              <Box
                key={user.id}
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                position="relative"
              >
                <Flex direction="column">
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="space-between"
                  ></Flex>

                  {/* Avatar and Name in Top Right with Name Below Avatar */}
                  <Flex
                    direction="column"
                    align="center"
                    position="absolute"
                    top={2}
                    right={2}
                  >
                    <Avatar size="md" src={user.avatar} />
                    <Text noOfLines={1}>{user.name}</Text>
                  </Flex>

                  <Flex direction="row" align="center" gap={2}>
                    <Text fontWeight="bold">Username: </Text>
                    <Text>{user.username}</Text>
                  </Flex>

                  <Flex direction="row" align="center" gap={2}>
                    <Text fontWeight="bold">Email: </Text>
                    <Text>{user.email}</Text>
                  </Flex>

                  <Flex direction="row" align="center" gap={2}>
                    <Text fontWeight="bold">Role: </Text>
                    <Text>{user.role === "admin" ? `"The EMPEROR"` : "Peasant"}</Text>
                  </Flex>

                  <Flex direction="row" align="center" gap={2}>
                    <Text fontWeight="bold">Joined: </Text>
                    <Text>{user.dateJoined}</Text>
                  </Flex>

                  <Flex direction="row" gap={4} justify="center" align="center">
                    {user.friends &&
                    user.friends.find(
                      (friend) => friend.userDocID === userDocID
                    ) ? (
                      <Tooltip label="Friend">
                        <Button size="sm" variant="ghost" colorScheme="green">
                          <BsFillPersonCheckFill />
                        </Button>
                      </Tooltip>
                    ) : user.requests &&
                      user.requests.find(
                        (request) => request.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Cancel Friend Request">
                        <Button
                          size="sm"
                          onClick={() => handleCancelFriendRequest(user.id)}
                          variant="ghost"
                          colorScheme="red"
                        >
                          <BsFillPersonXFill />
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip label="Send Friend Request">
                        <Button
                          size="sm"
                          onClick={() => handleFriendRequest(user.id)}
                          variant="ghost"
                          colorScheme="blue"
                        >
                          <BsFillPersonPlusFill />
                        </Button>
                      </Tooltip>
                    )}

                    {isAdmin && (
                      <>
                        <Tooltip label="Delete User">
                          <Button
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            variant="ghost"
                            colorScheme="red"
                          >
                            <MdDeleteForever />
                          </Button>
                        </Tooltip>
                        {user.isBlocked ? (
                          <Tooltip label="Unblock User">
                            <Button
                              size="sm"
                              onClick={() => handleUnblockUser(user.id)}
                              variant="ghost"
                              colorScheme="orange"
                            >
                              <AiFillLock />
                            </Button>
                          </Tooltip>
                        ) : (
                          <Tooltip label="Block User">
                            <Button
                              size="sm"
                              onClick={() => handleBlockUser(user.id)}
                              variant="ghost"
                              colorScheme="red"
                            >
                              <AiFillUnlock />
                            </Button>
                          </Tooltip>
                        )}
                      </>
                    )}
                        <Button
                          size="sm"
                          onClick={() => userPhotos(user.docID)}
                          variant="solid"
                          colorScheme="blue"
                          textColor="white"
                          border="2px solid"
                          borderColor="blue.400"
                          rounded="md"
                          px={2}
                          py={1}
                        >
                          Photos
                        </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Community;
