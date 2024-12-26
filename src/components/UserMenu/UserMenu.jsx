import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import ThemeButton from "../ThemeButton/ColorModeButton";

const UserMenu = () => {
  const {isAdmin, name, family, photoURL, signOut } = useContext(AuthContext);  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (name && family && photoURL) {
      setLoading(false);
    }
  }, [name, family, photoURL]);

if (loading) {
  return <Spinner position="fixed" top={4} mr={12} right={6} size="lg" />;
}

return (
  <Flex
    mt={-2}
    position="fixed"
    right={1}
    zIndex="sticky"
    borderRadius="md"
    h="70px"
    justifyContent={{ base: 'center', md: 'flex-end' }}
    alignItems="center"
    w="100%"
    px={{ base: 4, md: 6 }}
  >
    <Box paddingTop={2}>
      <Heading as="h3" size="xs" textAlign={{ base: 'center', md: 'right' }}>
        {`${name} ${family}`}
      </Heading>
      <Flex color="gray" alignItems="center" justifyContent={{ base: 'center', md: 'flex-end' }}>
        <Text textAlign={{ base: 'center', md: 'right' }}>
          {isAdmin ? `"The EMPEROR"` : "Peasant"}
        </Text>
      </Flex>
      <ThemeButton />
    </Box>

    <Menu>
  <MenuButton
    ml={{ base: 3, md: 2 }}
    as={Avatar}
    size="sm"
    src={photoURL}
    _hover={{ cursor: 'pointer' }}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <ChevronDownIcon />
  </MenuButton>
  <MenuList
    minWidth="130px"
  >
    <MenuItem onClick={() => navigate('/profile')}>Профил</MenuItem>
    <MenuDivider />
    <MenuItem onClick={() => navigate('/upload')}>Качи снимка</MenuItem>
    <MenuDivider />
    <MenuItem onClick={signOut}>Излез</MenuItem>
  </MenuList>
</Menu>


  </Flex>
);

}

export default UserMenu;
