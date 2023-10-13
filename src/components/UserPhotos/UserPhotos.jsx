import { useEffect, useState, useContext } from "react";
import { Grid, Box, Image, Text, Heading,Avatar,Flex,GridItem } from "@chakra-ui/react";
import SinglePhotoView from "../../components/SinglePhotoView/SinglePhotoView";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const UserPhotos = () => {
  const { setPhotos, photos, selectedPhoto, setSelectedPhoto } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const openSinglePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeSinglePhotoView = () => {
    setSelectedPhoto(null);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoCollection = collection(db, "photoData");
        const querySnapshot = await getDocs(photoCollection);

        const userDocref = doc(db, "users", id);
        const userDoc = await getDoc(userDocref);
        const userData = userDoc.data();
        setUser(userData);

        const photoData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((data) => data.owner === id);

        photoData.sort((a, b) => {
          const timestampA = a.uploadTimestamp || "";
          const timestampB = b.uploadTimestamp || "";
          return timestampB.localeCompare(timestampA);
        });

        setPhotos(photoData);
        setLoading(false);
        console.log("userphotos");
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id, setPhotos]);

  return (
    <Box w="1560px">
      <Grid h="600px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>

<GridItem rowSpan={1} colSpan={1}>
<Flex mr="-100px" justify="center">
  <Avatar
    src={user.avatar}
    height="200px"
    width="200px"
    alignSelf="center"
  />
  <Box mt="60px" ml="20px">
    <Text fontWeight="bold">
      Name: {user.name} {user.family}
    </Text>
    <Text fontWeight="bold">Username: {user.username}</Text>
    <Text fontWeight="bold">Email: {user.email}</Text>
    <Text fontWeight="bold">Photo count: {user.photoCount}</Text>
  </Box>
</Flex>
</GridItem>

  <GridItem rowSpan={1} colSpan={5}>
    <Heading mt="30px" as="h1" size="xl" marginBottom="4">
      User Photos
    </Heading>
    {loading ? (
      <Loading />
    ) : (
      <Grid h="80%" templateColumns="repeat(5, 1fr)" gap={4}>
        {photos.map((photo, index) => (
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
    )}
    {selectedPhoto && (
      <SinglePhotoView
        photo={selectedPhoto}
        setPhoto={setSelectedPhoto}
        onClose={closeSinglePhotoView}
        setPhotos={setPhotos}
      />
    )}

  </GridItem>
</Grid>
    </Box>
  );
};

export default UserPhotos;
