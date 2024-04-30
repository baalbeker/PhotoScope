import { useState, useContext } from 'react';
import { Box, Button, Container, Heading, Image, Grid } from '@chakra-ui/react';
import Loading from '../../components/Loading/Loading';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import SinglePhotoView from '../../components/SinglePhotoView/SinglePhotoView';
import { AuthContext } from '../../context/AuthContext';

const Photos = ({loading}) => {
  const { photos, setPhotos, selectedPhoto, setSelectedPhoto } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  const photosPerPage = 10;
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  return (
    <Container minWidth="180vh" minHeight={"80vh"} align="center">
      <Heading align="left" mt="30px" as="h1" size="xl" marginBottom="4">Photos</Heading>

        {loading ? (
          <Box minWidth="100vh" minHeight={"30vh"} align={"center"} >
            <Loading />
          </Box>
        ) : (
          <Grid h="80%" templateColumns="repeat(5, 1fr)" gap={4}>
            {currentPhotos.map((photo, index) => (
              <Box key={index} onClick={() => openSinglePhotoView(photo)}>
                <Image src={photo.url} alt={`Photo ${index}`} width="100%" height="250px" objectFit="cover" />
              </Box>
            ))}
          </Grid>
        )}

          <Box display="flex" mt={"3vh"} ml="90vh" transform="translateX(-50%)">
            {currentPage > 1 ? (
              <Button
              bgColor="#00CED1"
              color="white"
              m="auto"
              size="lg"
              padding="10px"
              borderRadius="8%"
              right="30px"
              onClick={() => setCurrentPage(currentPage - 1)}
              marginRight="2"
              >
                <AiOutlineArrowLeft size="lg"/>
              </Button>
            ) : (
              <Button
              bgColor="grey.900"
              color="white"
              m="auto"
              size="lg"
              padding="10px"
              borderRadius="8%"
              right="30px"
              marginRight="2"
              >
                <AiOutlineArrowLeft size="lg"/>
              </Button>
            )}

            {currentPage < totalPages ? (
              <Button
              bgColor="#00CED1"
              color="white"
              m="auto"
              size="lg"
              padding="10px"
              borderRadius="8%"
              onClick={() => setCurrentPage(currentPage + 1)}
              >
                <AiOutlineArrowRight size="lg"/>
              </Button>
            ) : (
              <Button
              bgColor="grey.900"
              color="white"
              m="auto"
              size="lg"
              padding="10px"
              borderRadius="8%"
              >
                <AiOutlineArrowRight size="lg"/>
              </Button>
            )}
          </Box>

        {selectedPhoto && (
          <SinglePhotoView photo={selectedPhoto} setPhoto={setSelectedPhoto} onClose={closeSinglePhotoView} setPhotos={setPhotos} />
        )}
        
    </Container>
  );
};

export default Photos;