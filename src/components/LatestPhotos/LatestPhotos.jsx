import { useContext } from "react";
import { Box, Grid, Flex, Image, Text ,useColorModeValue} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import SinglePhotoView from "../SinglePhotoView/SinglePhotoView";

const LatestPhotos = () => {
  const { photos, setPhotos, selectedPhoto, setSelectedPhoto } = useContext(AuthContext);
  const latestPhotos = photos.slice(-5);
  const bg = useColorModeValue('gray.200', 'gray.700')

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  return (
    <Box>
      <Grid h="52vh" templateColumns="repeat(5, 1fr)" gap={4}>
        {latestPhotos.map((photo, index) => (
          <Box
            maxW="30vh"
            bgColor={bg}
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
              fit="cover"
              width="100%"
              height="100%"
              alignSelf="center"
            />

            <Flex mt={"auto"}>
              <Text fontWeight="bold" mr="3vh">by @{photo.ownerName}</Text>
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
