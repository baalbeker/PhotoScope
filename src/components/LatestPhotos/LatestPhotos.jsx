import { useContext } from "react";
import { Box, Grid, Flex, Image, Text } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import SinglePhotoView from "../SinglePhotoView/SinglePhotoView";

const LatestPhotos = () => {
  const { photos, setPhotos, selectedPhoto, setSelectedPhoto } = useContext(AuthContext);
  const latestPhotos = photos.slice(-5);

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box mt="20px">
      <Grid h="80%" templateColumns="repeat(5, 1fr)" gap={4}>
        {latestPhotos.map((photo, index) => (
          <Box
            bgColor="#f0f8ff"
            borderRadius="8px"
            key={index}
            textAlign="center"
            onClick={() => openSinglePhotoView(photo)}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={photo.url}
              alt={photo.ownerName}
              maxW="100%"
              height="auto"
              alignSelf="center"
            />

            <Flex mt="10px">
              <Text fontWeight="bold" mr="40px">by @{photo.ownerName}</Text>
              {photo.createdAt && (
                <Box ml="10px">
                  <Text fontWeight="bold" fontSize="sm">
                    {photo.createdAt.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    {photo.createdAt.toDate().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </Text>
                </Box>
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
