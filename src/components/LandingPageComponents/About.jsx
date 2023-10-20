import { Box, Heading, Image, Text, Flex, Icon, Link } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import samiImage from "../../assets/sami.jpeg";
import logo from "../../assets/logo.png";

const About = () =>{

  return (
    <Box maxWidth="960px" mx="auto" p={6} >
      <Box textAlign="center" mb={"32"} >
        <Image src={logo} alt="Team Image" maxW="230px" mx="auto" my={4} borderRadius="md" />
        <Box fontSize="sm" textAlign="center" maxW="600px" mx="auto">
          <Text fontSize="md">
          PhotoScope isn't just a photo-sharing website; it's a platform that helps you manage your photos, showcase your talent, and even connects you with fellow photography enthusiasts. My vision? To make PhotoHub your go-to platform for sharing and discovering captivating photos, inspiring and supporting you in your photographic journey. Don't just capture moments, share them. Unleash your creativity. Join PhotoHub!
          </Text>
        </Box>
        <Heading as="h2" fontSize="2xl" my={6}>Creator</Heading>
        <Flex justify="center" mb={4}>
          <Box maxW="45vh" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={samiImage} alt="Samuil" objectFit="cover" h="300px" borderRadius="md" />
            <Heading as="h3" fontSize="xl" my={2}>Samuil Yoshkov</Heading>
            <Text fontWeight="bold" mb={4}>
              Junior JavaScript developer passionate about nature, hiking, and coding.
            </Text>
            <Heading as="h4" fontSize="md" my={2}>Contacts:</Heading>
            <Flex justifyContent="center" mt={5}>
              <Link href="mailto:samuilmnt@gmail.com" isExternal>
                <Icon as={FaEnvelope} boxSize={6} mr={2} />
              </Link>
              <Link href="https://www.linkedin.com/in/samuil-yoshkov-35a269278" isExternal ml={4}>
                <Icon as={FaLinkedin} boxSize={6} mr={2} />
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default About;