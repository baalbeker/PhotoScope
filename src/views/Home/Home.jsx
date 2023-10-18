import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useState,useEffect } from "react";
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
    <Box w="180vh" mt="13vh">
      <Grid h="600px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem mt="-40px" colSpan={5} rounded="md" borderColor="gray.50" h="25vh" bgImage={images[bgImageIndex]} />
          <GridItem  mt="-150px" rowSpan={2} colSpan={5}>
            <Box>
              <Heading>Latest Photos</Heading>
            </Box>
            <Box>
              <LatestPhotos />
            </Box>
          </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
