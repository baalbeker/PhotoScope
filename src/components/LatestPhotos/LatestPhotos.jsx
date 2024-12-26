import { useContext } from "react";
import {
  Box,
  Grid,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import SinglePhotoView from "../SinglePhotoView/SinglePhotoView";

const LatestPhotos = () => {
  const { photos, setPhotos, selectedPhoto, setSelectedPhoto, loading } =
    useContext(AuthContext);
  // const latestPhotos = photos.reverse().slice(0, 6);
  const bg = useColorModeValue("gray.100", "gray.700");
  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
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
    <Box>
      <Grid
        h="auto"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
        }}
        gap={{ base: "1", md: "4" }}
      >
        {photos.map((photo, index) => (
          <Box
            mb={5}
            key={index}
            bg={bg}
            borderRadius="md"
            boxShadow="md"
            onClick={() => openSinglePhotoView(photo)}
            _hover={{ cursor: "pointer", boxShadow: "lg" }}
            transition="all 0.3s ease"
          >
            <Image
              src={photo.url}
              alt={photo.ownerName}
              borderTopRadius="md"
              objectFit="cover"
              width="100%"
              height="200px"
              mb={4}
            />

            <Flex align="center" justify="space-between" p={4}>
              <Text fontWeight="bold" fontSize="lg">
                {photo.ownerName}
              </Text>
              {photo.createdAt && (
                <Flex gap="2" align="center">
                  <Text fontSize="sm" color="gray.500">
                    {photo.createdAt.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {photo.createdAt.toDate().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Box>
        ))}
      </Grid>

      {selectedPhoto && (
        <SinglePhotoView
          photo={selectedPhoto}
          setPhoto={setSelectedPhoto}
          onClose={closeSinglePhotoView}
          setPhotos={setPhotos}
        />
      )}
    </Box>
  );
};

export default LatestPhotos;
