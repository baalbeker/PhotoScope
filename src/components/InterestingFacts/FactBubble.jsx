import { Flex, Box, Text, useColorModeValue, Image } from "@chakra-ui/react";
import displayRandomFact from "./InterestingFacts";
import { useState, useEffect } from "react";
import photoboy from '../../assets/photoboy.png';
import photogirl from '../../assets/photogirl.png'

const FactBubble = () => {
  const [randomFact, setRandomFact] = useState("");
  const [randomIcon, setRandomIcon] = useState("");

  useEffect(() => {
    setRandomFact(displayRandomFact());
    const icons = [photoboy, photogirl];
    setRandomIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  return (
    <Box
      position={'absolute'}
      top={20}
      left={40}
      w={{ base: 'full', sm: 'sm' }}
      p={4}
      bg={useColorModeValue('gray.200', 'gray.600')}
      rounded={'lg'}
      boxShadow={'lg'}
    >
      <Flex direction="column" alignItems="center">
        <Flex alignItems="center">
          <Text fontSize={'3xl'}>💬</Text>
          <Box fontSize={'md'} fontStyle="italic" ml={2}>
            <Text>{randomFact}</Text>
          </Box>
        </Flex>
        <Image src={randomIcon} alt="Fitness Icon" mt={4} />
      </Flex>
    </Box>
  );
}

export default FactBubble;