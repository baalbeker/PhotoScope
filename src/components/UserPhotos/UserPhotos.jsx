import { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Avatar,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";

import SinglePhotoView from "../../components/SinglePhotoView/SinglePhotoView";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const UserPhotos = () => {
  const { setPhotos, selectedPhoto, setSelectedPhoto } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);

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

        setUserPhotos(photoData);
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
    <Box w="100%" maxW="1560px" mx="auto" >
      <Grid
        h="600px"
        templateRows="repeat(2, 1fr)"
        templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
        gap={4}
        p={5}
        mt={-20}
      >
        <GridItem rowSpan={1} colSpan={{ base: 1, md: 1 }}>
          <Flex justify="center" direction={{ base: "column", md: "row" }}>
            <Avatar src={user.avatar} height="200px" width="200px" />
            <Box mt={{ base: "20px", md: "60px" }} ml={{ base: 0, md: "20px" }}>
              <Box display="flex" mb="8px">
                <Text fontWeight="bold" mr="8px">
                  Name:
                </Text>
                <Text>
                  {user.name} {user.family}
                </Text>
              </Box>
              <Box display="flex" mb="8px">
                <Text fontWeight="bold" mr="8px">
                  Username:
                </Text>
                <Text>{user.username}</Text>
              </Box>
              <Box display="flex" mb="8px">
                <Text fontWeight="bold" mr="8px">
                  Email:
                </Text>
                <Text>{user.email}</Text>
              </Box>
              <Box display="flex" mb="8px">
                <Text fontWeight="bold" mr="8px">
                  Photo count:
                </Text>
                <Text>{user.photoCount}</Text>
              </Box>
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
            <Grid
              h="80%"
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
              }}
              gap={4}
              mb={5}
            >
              {userPhotos.map((photo, index) => (
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

//LIGHTWEIGHT BUT NO USER DATA BECAUSE OF NO FETCH

// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Grid,
//   GridItem,
//   Flex,
//   Avatar,
//   Text,
//   Heading,
//   Image,
// } from "@chakra-ui/react";

// import SinglePhotoView from "../../components/SinglePhotoView/SinglePhotoView";
// import Loading from "../../components/Loading/Loading";
// import { AuthContext } from "../../context/AuthContext";

// const UserPhotos = () => {
//   const { setPhotos, photos, selectedPhoto, setSelectedPhoto } = useContext(AuthContext);
//   const [filteredPhotos, setFilteredPhotos] = useState(true);
//   const [loading, setLoading] = useState(true);

//   const openSinglePhotoView = (photo) => {
//     setSelectedPhoto(photo);
//   };

//   const closeSinglePhotoView = () => {
//     setSelectedPhoto(null);
//   };

//   const { id: personID } = useParams();

//   useEffect(() => {
//     if (photos.length) {
//       console.log(personID);
//       setFilteredPhotos(photos.filter(photo => photo.owner === personID));
//       setLoading(false);
//     }
//   }, [photos, personID]);

//   return (
//     <Box w="100%" maxW="1560px" mx="auto">
//       <Grid
//         h="600px"
//         templateRows="repeat(2, 1fr)"
//         templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }}
//         gap={4}
//         p={5}
//         mt={-20}
//       >
//         <GridItem rowSpan={1} colSpan={{ base: 1, md: 1 }}>
//           <Flex justify="center" direction={{ base: "column", md: "row" }}>
//             <Avatar src={user.avatar} height="200px" width="200px" />
//             <Box mt={{ base: "20px", md: "60px" }} ml={{ base: 0, md: "20px" }}>
//               <Box display="flex" mb="8px">
//                 <Text fontWeight="bold" mr="8px">
//                   Name:
//                 </Text>
//                 <Text>
//                   {user.name} {user.family}
//                 </Text>
//               </Box>
//               <Box display="flex" mb="8px">
//                 <Text fontWeight="bold" mr="8px">
//                   Username:
//                 </Text>
//                 <Text>{user.username}</Text>
//               </Box>
//               <Box display="flex" mb="8px">
//                 <Text fontWeight="bold" mr="8px">
//                   Email:
//                 </Text>
//                 <Text>{user.email}</Text>
//               </Box>
//               <Box display="flex" mb="8px">
//                 <Text fontWeight="bold" mr="8px">
//                   Photo count:
//                 </Text>
//                 <Text>{user.photoCount}</Text>
//               </Box>
//             </Box>
//           </Flex>
//         </GridItem>

//         <GridItem rowSpan={1} colSpan={5}>
//           <Heading mt="30px" as="h1" size="xl" marginBottom="4">
//             User Photos
//           </Heading>
//           {loading ? (
//             <Loading />
//           ) : (
//             <Grid
//               h="80%"
//               templateColumns={{
//                 base: "repeat(2, 1fr)",
//                 sm: "repeat(3, 1fr)",
//                 md: "repeat(5, 1fr)",
//               }}
//               gap={4}
//             >
//               {filteredPhotos.map((photo, index) => (
//                 <Box key={index} onClick={() => openSinglePhotoView(photo)}>
//                   <Image
//                     src={photo.url}
//                     alt={`Photo ${index}`}
//                     width="100%"
//                     height="250px"
//                     objectFit="cover"
//                   />
//                 </Box>
//               ))}
//             </Grid>
//           )}
//           {selectedPhoto && (
//             <SinglePhotoView
//               photo={selectedPhoto}
//               setPhoto={setSelectedPhoto}
//               onClose={closeSinglePhotoView}
//               setPhotos={setPhotos}
//             />
//           )}
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// };

// export default UserPhotos;
