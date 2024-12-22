import { useContext,useState,useEffect } from "react";
import { Box, Button, Text, Tooltip,Spinner, Avatar, FormControl, FormLabel,useColorModeValue, Input, Select, Flex, Td, Th, Tbody, Thead, Table, Tr, Grid, GridItem } from "@chakra-ui/react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsFillPersonBadgeFill, } from "react-icons/bs";
import CommunityLogic from "../../logic/CommunityLogic";
import goalheader from "../../assets/img5.jpg";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { userDocID, isAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    userList,
    searchTerm,
    searchType,
    sortConfig,
    bg,
    handleSearchTermChange,
    handleSearchTypeChange,
    handleDeleteUser,
    handleBlockUser,
    handleUnblockUser,
    handleFriendRequest,
    handleCancelFriendRequest,
    onSort
  } = CommunityLogic()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const userPhotos = (id) => navigate(`/user/${id}`);
  
  return (
    <Box w="170vh" h={"80vh"}>
      <Grid templateColumns="repeat(1, 1fr)" h="600px">

        <GridItem colSpan={1} rounded="md" borderColor="gray.50" h="25vh" bgImage={goalheader} p={8} />

        <GridItem colSpan={1} bgColor={bg}>
          <FormControl mb={4}>
            <FormLabel
              htmlFor="searchType"
              fontWeight="bold"
              fontSize="sm"
              mb={2}
            >
              Search by:
            </FormLabel>
            <Select
              id="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
              bg="bg"
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
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <Table variant="simple" >
          <Thead>
            <Tr>
              <Th onClick={() => onSort('name')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Name '}{sortConfig?.field === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('photoCount')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Photos '}{sortConfig?.field === 'photoCount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('username')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Username '}{sortConfig?.field === 'username' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('email')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Email '}{sortConfig?.field === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('role')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Role '}{sortConfig?.field === 'role' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('isBlocked')} _hover={{ cursor: "pointer" }} color={useColorModeValue('black', 'white')}>{'Status '}{sortConfig?.field === 'isBlocked' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <Box ml="700px" mt="200px" display="flex" justifyContent="center" alignItems="center" height="70%">
            <Spinner size="xl" />
          </Box>
          ) : (
            <Tbody>
              {userList.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" src={user.avatar}/>
                      <Text ml="2">{user.name} {user.family}</Text>
                    </Flex>
                  </Td>
                  <Td>{user.photoCount}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.isBlocked ? "Blocked" : "Not Blocked"}</Td>
                  <Td>
                    {user.friends &&
                      user.friends.find(
                        (friend) => friend.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Friend">
                        <Button className="friends" size="md"variant="ghost"colorScheme="green">
                          <Flex align="center"><BsFillPersonCheckFill /></Flex>
                        </Button>
                      </Tooltip>
                      ) : user.requests && user.requests.find((request) => request.userDocID === userDocID
                        ) ? (
                        <Tooltip label="Cancel Friend Request">
                          <Button className="cancelrequest" onClick={() => handleCancelFriendRequest(user.id)} size="md" variant="ghost" colorScheme="red">
                            <Flex align="center"><BsFillPersonXFill /></Flex>
                          </Button>
                        </Tooltip>
                        ) : user.docID === userDocID ? (
                          <Tooltip label="You">
                            <Button className="reddotbutton" size="md" variant="ghost" colorScheme="orange">
                              <Flex align="center"><BsFillPersonBadgeFill /></Flex>
                            </Button>
                          </Tooltip>
                        ) : (
                          <Tooltip label="Send Friend Request">
                            <Button className="friendrequest" onClick={() => handleFriendRequest(user.id)} size="md" variant="ghost" colorScheme="linkedin">
                              <Flex align="center"><BsFillPersonPlusFill /></Flex>
                            </Button>
                          </Tooltip>
                    )}
                  </Td>
                  {isAdmin && (
                    <>
                      <Td>
                        <Tooltip label="Delete User">
                          <Button className="deleteuser" onClick={() => handleDeleteUser(user.id)} size="lg" variant="ghost" colorScheme="red" p={1}>
                            <Flex align="center">
                              <MdDeleteForever />
                            </Flex>
                          </Button>
                        </Tooltip>
                      </Td>
                      <Td>
                        <Button className="openPhotos" onClick={() => userPhotos(user.docID)} size="md" variant="ghost" colorScheme="gray">
                          Photos
                        </Button>
                      </Td>
                      <Td>
                        {user.isBlocked ? (
                          <Tooltip label="Unblock User">
                            <Button
                              className="unblockuser"
                              onClick={() => handleUnblockUser(user.id)}
                              size="md"
                              variant="ghost"
                              colorScheme="red"
                            >
                              <Flex align="center"><AiFillLock /></Flex>
                            </Button>
                          </Tooltip>
                        ) : (
                          <Tooltip label="Block User">
                            <Button className="blockuser" onClick={() => handleBlockUser(user.id)} size="md" variant="ghost" colorScheme="green">
                              <Flex align="center"><AiFillUnlock /></Flex>
                            </Button>
                          </Tooltip>
                        )}
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
            )}
          </Table>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Community;
