import { useState, useContext } from 'react'
import { Flex,IconButton,Box, Image,useColorMode} from '@chakra-ui/react'
import { FiMenu, FiHome } from 'react-icons/fi'
import {HiOutlinePhone} from 'react-icons/hi';
import { BiPhotoAlbum } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import { FriendsContext } from '../../context/FriendsContext';
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import NavItem from './NavItem'
const MotionBox = motion(Box);

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const {requests} = useContext(FriendsContext);
    const [navSize, changeNavSize] = useState("large")
    const { colorMode } = useColorMode();
    const bg = (colorMode) === "dark" ? "gray.800" : "white";
    const logoto = (colorMode) === "dark" ? logo2 : logo;

    return (
      <Flex
        pos="sticky"
        left="5"
        h="93vh"
        marginTop="3.5vh"
        boxShadow="0 10px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "9vh" : "22vh"}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex
          p="5px"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
          className="logo-holder" 
        >
          <MotionBox
            as={Image}
            src={logoto}
            alt="Logo"
            w="150px"
            h="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            cursor="pointer"
            onClick={() => navigate("/home")}
            className="bg" 
          />
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: "gray.200" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
          <NavItem
            link="/home"
            navSize={navSize}
            icon={FiHome}
            title="Home"
            active={location.pathname === "/home"}
          />
          <NavItem
            link="/photos"
            navSize={navSize}
            icon={BiPhotoAlbum}
            title="Photos"
            active={location.pathname === "/photos"}
          />
          <NavItem
            link="/community"
            navSize={navSize}
            icon={FaUsers}
            title="Community"
            active={location.pathname === "/community"}
          />
          <NavItem
          link="/friends"
          navSize={navSize}
          icon={FaUsers}
          title="Friends"
          active={location.pathname === "/friends"}
          friendRequestCount={requests.length} 
        />
            <NavItem
              link="/contacts"
              navSize={navSize}
              icon={HiOutlinePhone}
              title="Contacts"
              active={location.pathname === "/contacts"}
            />
          <NavItem
            link="/profile"
            navSize={navSize}
            icon={CgProfile}
            title="Profile"
            active={location.pathname === "/profile"}
          />
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
          className="progress-bars"
        >
        </Flex>
      </Flex>
    );
}

export default Navigation;