import { useContext, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  Grid,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import SinglePhotoView from "../../components/SinglePhotoView/SinglePhotoView";
import { AuthContext } from "../../context/AuthContext";

const Photos = () => {
  const {
    photos,
    setPhotos,
    selectedPhoto,
    setSelectedPhoto,
    loading,
  } = useContext(AuthContext);
  const [visiblePhotos, setVisiblePhotos] = useState(10);

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = () => {
    setVisiblePhotos((prev) => prev + 10);
  };

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
    <Container mt={7} mb={5} minWidth="100%" align="center" overflow="auto">
      <Heading align="left" mt="30px" as="h1" size="xl" marginBottom="4">
        Снимки
      </Heading>

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
    </Container>
  );
};

export default Photos;
