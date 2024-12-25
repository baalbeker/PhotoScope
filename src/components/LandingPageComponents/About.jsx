import { Box, Heading, Image, Text, Flex, Icon, Link } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import samiImage from "../../assets/sami.jpeg";

const About = () =>{

  return (
    <Box maxWidth="960px" mx="auto" >
      <Box textAlign="center">
        <Heading as="h2" fontSize="2xl" my={6}>Създател</Heading>
        <Flex justify="center" mb={4}>
          <Box maxW="45vh" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={samiImage} alt="Samuil" objectFit="cover" h="300px" borderRadius="md" />
            <Heading as="h3" fontSize="xl" my={2}>Самуил Йошков</Heading>
            <Text fontWeight="bold" mb={4}>
              Главен програмист
            </Text>
            <Heading as="h4" fontSize="md" my={2}>Контакти:</Heading>
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