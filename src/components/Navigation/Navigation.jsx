import { useContext } from "react";
import {
  Flex,
  IconButton,
  Box,
  Image,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu, FiHome } from "react-icons/fi";
import { HiOutlinePhone } from "react-icons/hi";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import NavItem from "./NavItem";

const MotionBox = motion(Box);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requests } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoto = colorMode === "dark" ? logo2 : logo;

  return (
    <Flex>
      {/* Mobile Navigation (Drawer) */}
      <IconButton
        background="none"
        display={{ base: "block", md: "none" }}
        _hover={{ background: "gray.200" }}
        icon={<FiMenu />}
        onClick={onOpen}
        size="lg"
        fontSize="3xl"
        position="fixed"
        right="1"
        zIndex="overlay"
      />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="xl" />
          <DrawerHeader>
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
            />
          </DrawerHeader>
          <DrawerBody>
            <NavItem
              link="/home"
              icon={FiHome}
              title="Начало"
              active={location.pathname === "/home"}
              onClick={onClose}
            />
            <NavItem
              link="/photos"
              icon={BiPhotoAlbum}
              title="Снимки"
              active={location.pathname === "/photos"}
              onClick={onClose} 
            />
            <NavItem
              link="/community"
              icon={FaUsers}
              title="Общност"
              active={location.pathname === "/community"}
              onClick={onClose} 
            />
            <NavItem
              link="/friends"
              icon={FaUsers}
              title="Приятели"
              active={location.pathname === "/friends"}
              friendRequestCount={requests.length}
              onClick={onClose} 
            />
            <NavItem
              link="/contacts"
              icon={HiOutlinePhone}
              title="Контакт"
              active={location.pathname === "/contacts"}
              onClick={onClose} 
            />
            <NavItem
              link="/profile"
              icon={CgProfile}
              title="Профил"
              active={location.pathname === "/profile"}
              onClick={onClose} 
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Navigation */}
      <Flex
        display={{ base: "none", md: "flex" }}
        p="5px"
        flexDir="column"
        w="100%"
        ml={6}
        as="nav"
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
        />
        <NavItem
          link="/home"
          icon={FiHome}
          title="Начало"
          active={location.pathname === "/home"}
        />
        <NavItem
          link="/photos"
          icon={BiPhotoAlbum}
          title="Снимки"
          active={location.pathname === "/photos"}
        />
        <NavItem
          link="/community"
          icon={FaUsers}
          title="Общност"
          active={location.pathname === "/community"}
        />
        <NavItem
          link="/friends"
          icon={FaUsers}
          title="Приятели"
          active={location.pathname === "/friends"}
          friendRequestCount={requests.length}
        />
        <NavItem
          link="/contacts"
          icon={HiOutlinePhone}
          title="Контакт"
          active={location.pathname === "/contacts"}
        />
        <NavItem
          link="/profile"
          icon={CgProfile}
          title="Профил"
          active={location.pathname === "/profile"}
        />
      </Flex>
    </Flex>
  );
};

export default Navigation;
