import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import ThemeButton from "../ThemeButton/ColorModeButton";

const UserMenu = () => {
  const { name, family, isAdmin, signOut, photoURL } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleSignOut = () => signOut();

  useEffect(() => {
    if (name && family && isAdmin !== undefined && photoURL) {
      setLoading(false);
    }
  }, [name, family, isAdmin, photoURL]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) handleSignOut();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <Spinner position="fixed" top={4} mr={12} right={6} size="lg" />;
  }

  return (
    <Flex mt='10px' position="fixed" right={0} w="37vh" zIndex={"sticky"} borderRadius={"md"} h={"70px"}>
      <Box paddingTop={"2"}>
        <Heading as="h3" size="sm">{`${name} ${family}`}</Heading>
        <Flex color="gray" alignItems="center">
          <Text textAlign="right">{isAdmin ? ' Admin' : ' User'}</Text>
        </Flex>
        <ThemeButton />
      </Box>
      
      <Menu>
        <MenuButton ml={"2"} mt={1} as={Avatar} size="md" src={photoURL} _hover={{ cursor: 'pointer' }}>
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => navigate('/upload')}>Upload</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default UserMenu;