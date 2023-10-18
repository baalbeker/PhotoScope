import { Box, Text, Button, ButtonGroup, Flex, Heading,Spinner } from "@chakra-ui/react";
import { useContext,useState,useEffect } from "react";
import { Popover, Tooltip, Avatar, Td, Th, Tbody, Thead, Table,Divider, Tr, Grid, PopoverTrigger, PopoverContent, GridItem, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter } from "@chakra-ui/react";
import { BsFillPersonXFill, } from "react-icons/bs";
import { FriendsContext } from "../../context/FriendsContext";
import FriendsLogic from "../../logic/FriendsLogic/FriendsLogic";
import user from "../../assets/user.png"
import goalheader from "../../assets/img5.jpg";
import "./Friends.css"

const Friends = () => {
  const { requests, friends } = useContext(FriendsContext)
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleAccept,
    handleRemoveFriend,
    initialFocusRef,
    handleDecline
  } = FriendsLogic();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box w="170vh" h={"80vh"}>
      <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" h="600px">
        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="25vh" bgImage={goalheader} />
        <GridItem mt={3} colSpan={4}>
          <Text mb={4} fontSize="2xl" fontWeight="bold">Friends</Text>

          <Table key={friends.userDocID} variant="unstyled">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <Tbody>
              <Tr>
                <Td colSpan={5}>
                  <Box mt="100px" display="flex" justifyContent="center" alignItems="center" height="70%">
                    <Spinner size="xl" />
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <>
                {friends.length > 0 ? (
              <Tbody>
                {friends.map((user,index) => (
                  <Tr key={index}>
                    <Td>
                      <Flex align="center">
                        <Avatar
                          size="sm"
                          src={user.avatar ? user.avatar : user}
                          _hover={{ cursor: "pointer" }}
                        />
                        <Text ml="2">
                          {user.name} {user.family}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Tooltip label="Remove from friends">
                        <Button
                          className="deleteuser"
                          onClick={() => handleRemoveFriend(user.docID)}
                          size="lg"
                          variant="ghost"
                          colorScheme="red"
                          p={1}
                        >
                          <Flex align="center">
                            <BsFillPersonXFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            ) : (
              <Tbody>
                  <Td colSpan={5}>
                    <Heading as="div" mt={10}>
                      Your friend list is empty.
                    </Heading>
                  </Td>
              </Tbody>
            )}
            </>
          )}
          </Table>
        </GridItem>

        <GridItem colSpan={1}>
          <Divider mt={5} orientation='vertical' float="left" />
          <Box mt={3} align={"center"}>
          <Text mb={4} fontSize="2xl" fontWeight="bold">Friend requests</Text>
          {requests.length < 1  ? (
            <Text ml={6}>No friend requests.</Text>
          ) : (
            requests.map((request) => (
              <Popover
                key={request.userDocID}
                initialFocusRef={initialFocusRef}
                placement="bottom"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Button bgColor="blue.500" mt={3} className="reqbutton">{request.name} wants to be friends.</Button>
                </PopoverTrigger>
                <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    {request.name} {request.family}
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>Hello, can we be friends ?</PopoverBody>
                  <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="space-between" pb={4}>
                    <ButtonGroup size="sm">
                      <Button onClick={() => handleAccept(request)} ref={initialFocusRef} colorScheme="whatsapp">
                        Accept
                      </Button>
                      <Button onClick={() => handleDecline(request)} colorScheme="red">
                        Decline
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            ))
          )}
          </Box>
        </GridItem>
      </Grid>
    </Box>

  );
};

export default Friends;
