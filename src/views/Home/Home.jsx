import { Box, Grid, GridItem, Text,Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LatestPhotos from "../../components/LatestPhotos/LatestPhotos";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";

const Home = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Box w="100%" h="100vh" mt={8} p={5}>
      <Flex direction="column" align="flex-start" h="100vh" justify="flex-start" w="100%">
        <Box
          bgImage={`url(${images[bgImageIndex]})`}
          bgSize="cover"
          bgPosition="center"
          w="100%"
          h={{ base: "10vh", md: "20vh" }}
          rounded="md"
          // mb={4}
          p={6}
          
        >
          <Text mt={{ base: "1", md: "6vh" }} textAlign="left" fontSize="25px" fontWeight="bold" color="white">
            Снимки
          </Text>
        </Box>
        <Box w="100%" mt={6}>
          <LatestPhotos />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
