import { useContext, useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  Grid,
  Button,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import SinglePhotoView from "../../components/SinglePhotoView/SinglePhotoView";
import { AuthContext } from "../../context/AuthContext";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";

const Photos = () => {
  const {
    photos,
    setPhotos,
    selectedPhoto,
    setSelectedPhoto,
    loading,
  } = useContext(AuthContext);

  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = () => {
    setVisiblePhotos((prev) => prev + 6);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <Flex align="center" justify="center" height="68vh">
        <Spinner
          thickness="6px"
          speed="0.65s"
          color="blue.500"
          w="130px"
          h="130px"
        />
      </Flex>
    );
  }

  return (
    <Container mt={14} mb={5} minWidth="100%" align="center" overflow="auto">
      <Flex direction="column" align="flex-start" h="100vh" justify="flex-start" w="100%">

        <Box
          bgImage={`url(${images[bgImageIndex]})`}
          bgSize="cover"
          bgPosition="center"
          w="100%"
          h={{ base: "10vh", md: "20vh" }}
          rounded="md"
          mb={4}
          p={6}
          
        >
          <Text mt={{ base: "1", md: "6vh" }} textAlign="left" fontSize="25px" fontWeight="bold" color="white">
            Нови снимки
          </Text>
        </Box>

        {/* Photo grid */}
        <Grid
          h="auto"
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {photos.slice(0, visiblePhotos).map((photo, index) => (
            <Box key={index} onClick={() => openSinglePhotoView(photo)}>
              <Image
                src={photo.url}
                alt={`Photo ${index}`}
                width="100%"
                height="250px"
                objectFit="cover"
              />
            </Box>
          ))}
        </Grid>

        {photos.length > visiblePhotos && (
          <Button
            mt={4}
            mb={4}
            onClick={loadMorePhotos}
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            borderRadius="md"
            px={4}
            py={2}
          >
            Повече
          </Button>
        )}

        {selectedPhoto && (
          <SinglePhotoView
            photo={selectedPhoto}
            setPhoto={setSelectedPhoto}
            onClose={closeSinglePhotoView}
            setPhotos={setPhotos}
          />
        )}
      </Flex>
    </Container>
  );
};

export default Photos;
