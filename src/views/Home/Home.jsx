import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
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
  }, []);

  return (
    <Box w="100%" h="100vh" mb={4} mt={8} p={5}>
      <Grid
        h="100%"
        templateRows={{ base: "1fr 1fr", md: "1fr 1fr" }}
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
      >
        <GridItem
          colSpan={4}
          rowSpan={1}
          rounded="md"
          borderColor="gray.50"
          h={{ base: "20vh", md: "20vh" }}
          bgImage={`url(${images[bgImageIndex]})`}
          bgSize="cover"
          bgPosition="center"
        />
        <GridItem
          rowSpan={1}
          colSpan={4}
        >
          <Heading mb={{ base: "1vh", md: "2vh" }} textAlign="center">
            Нови снимки
          </Heading>
          <LatestPhotos />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
