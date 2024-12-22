import { useContext } from "react";
import { Box, Grid, Flex, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import SinglePhotoView from "../SinglePhotoView/SinglePhotoView";

const LatestPhotos = () => {
  const { photos, setPhotos, selectedPhoto, setSelectedPhoto } = useContext(AuthContext);
  const latestPhotos = photos.slice(-5);
  const bg = useColorModeValue('gray.100', 'gray.700');

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        mb={8}
      >
        {latestPhotos.map((photo, index) => (
          <Box
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

            <VStack align="start" p={4}>
              <Text fontWeight="bold" fontSize="lg">
                by @{photo.ownerName}
              </Text>
              {photo.createdAt && (
                <Box>
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
                </Box>
              )}
            </VStack>
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
