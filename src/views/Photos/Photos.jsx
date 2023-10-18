import { useState, useContext } from 'react';
import { Box, Button, Container, Heading, Image, Grid } from '@chakra-ui/react';
import Loading from '../../components/Loading/Loading';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import SinglePhotoView from '../../components/SinglePhotoView/SinglePhotoView';
import { AuthContext } from '../../context/AuthContext';

const Photos = ({ loading }) => {
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
    <Container minWidth="180vh" minHeight={"80vh"}>
      <Heading mt="30px" as="h1" size="xl" marginBottom="4">
        Photos
      </Heading>
      {loading ? (
        <Loading />
      ) : (
        <Grid h="80%" templateColumns="repeat(5, 1fr)" gap={4}>
          {currentPhotos.map((photo, index) => (
            <Box key={index} onClick={() => openSinglePhotoView(photo)}>
              <Image src={photo.url} alt={`Photo ${index}`} width="100%" height="250px" objectFit="cover" />
            </Box>
          ))}
        </Grid>
      )}

      {selectedPhoto && (
        <SinglePhotoView photo={selectedPhoto} setPhoto={setSelectedPhoto} onClose={closeSinglePhotoView} setPhotos={setPhotos} />
      )}

      <Box ml="30px">
        {currentPage > 1 && (
          <Button
            size="lg"
            borderRadius="47%"
            right="30px"
            padding="20px"
            onClick={() => setCurrentPage(currentPage - 1)}
            marginRight="2"
          >
            <AiOutlineArrowLeft />
          </Button>
        )}
        {currentPage < totalPages && (
          <Button
            size="lg"
            padding="20px"
            borderRadius="47%"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastPhoto >= photos.length}
          >
            <AiOutlineArrowRight />
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Photos;
