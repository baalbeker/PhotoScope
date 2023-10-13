import { ChakraProvider, Flex, useColorMode } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection, where, query, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "./context/AuthContext"
import { FriendsContext } from "./context/FriendsContext";
import ThemeButton from "./components/ThemeButton/ColorModeButton";

import userimage from "./assets/user.png"
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Authentication/Register/Register"
import Profile from "./views/Profile/Profile";
import Photos from "./views/Photos/Photos";
import Community from "./views/Community/Community";
import Login from "./views/Authentication/Login/Login";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import UserMenu from "./components/UserMenu/UserMenu";
import Friends from "./views/Friends/Friends";
import Footer from "./components/Footer/Footer";
import Upload from "./views/Upload/Upload";
import ContactForm from "./components/ContactForm/ContactForm";
import UserPhotos from "./components/UserPhotos/UserPhotos";

function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [isAdmin, setAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userID, setUserID] = useState("");
  const [userDocID, setUserDocID] = useState("")
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState(userimage);
  const [password, setPassword] = useState("")
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoCount,setPhotoCount] = useState(0)


  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [requests, setRequests] = useState([]);

  const { colorMode } = useColorMode();
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userDocID) {
          const userDocref = doc(db, "users", userDocID);
          const userDoc = await getDoc(userDocref);
          const userData = userDoc.data();

          const requestsData = userData?.requests || [];
          setRequests(requestsData);

          const friendsData = userData?.friends || [];
          const filteredFriends = [];

          for (const friend of friendsData) {
            const friendDocRef = doc(db, "users", friend.userDocID);
            const friendDoc = await getDoc(friendDocRef);
            const friendData = friendDoc.data();
            filteredFriends.push(friendData);
          }
          setFriends(filteredFriends);
          console.log('app1');

        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userDocID]);


  useEffect(() => {
    const getUsers = async () => {
      const q = query(usersCollection, where("id", "==", userID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().isBlocked === true) {
          setIsBlocked(true);
        }
        if (doc.data().role === 'admin') {
          setAdmin(true);
        }
        setUserDocID(doc.data().docID)
        setPhotoCount(doc.data().photoCount)
        setName(doc.data().name)
        setFamily(doc.data().family)
        setUsername(doc.data().username)
        setEmail(doc.data().email);
        setPassword(doc.data().password)
        console.log('app2');

      });
    };
    getUsers();
  }, [usersCollection, userID]);


  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoCollection = collection(db, 'photoData');
        const querySnapshot = await getDocs(photoCollection);
        const photoData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((data) => data.fileName);
        photoData.sort((a, b) => {
          const userComparison = (a.userId?.localeCompare(b.userId)) || 0;
          const timestampA = a.uploadTimestamp || '';
          const timestampB = b.uploadTimestamp || '';
          return userComparison !== 0 ? userComparison : timestampB.localeCompare(timestampA);
        });

        setPhotos(photoData);
        setLoading(false);
        console.log('applast');

      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setPhotoURL(user.photoURL || photoURL);
        setUserID(user.uid);
      } else {
        setName('')
        setEmail("");
        setIsAuth(false);
        setAdmin(false);
        setIsBlocked(false);
        setPhotoURL(userimage)
        setUserID("");
      }
    });
    return unsubscribe;
  }, [photoURL]);

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("isAuth", false);
        setIsAuth(false);
        setEmail("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin,
        setAdmin,
        signOut: signUserOut,
        isBlocked,
        setIsBlocked,
        userID,
        setUserID,
        name,
        setName,
        family,
        setFamily,
        username,
        setUsername,
        email,
        setEmail,
        photoURL,
        setPhotoURL,
        password,
        setPassword,
        userDocID,
        setUserDocID,
        photos,
        setPhotos,
        selectedPhoto,
        setSelectedPhoto,
        photoCount,
        setPhotoCount
      }}
    >
          <FriendsContext.Provider
            value={{
              requests,
              setRequests,
              friends,
              setFriends
            }}>
            <ChakraProvider>
              <Flex className="App" position="relative">
                {isAuth &&
                  location.pathname !== "/register" &&
                  location.pathname !== "/login" && <Navigation colorMode={colorMode} />}
                {isAuth &&
                  location.pathname !== "/register" &&
                  location.pathname !== "/login" && <UserMenu />}
                <Flex
                  as="main"
                  flexGrow={1}
                  justifyContent="center"
                  alignItems="center"
                  p={5}
                >
                  <Flex as="main" direction="column" minHeight="100vh" flexGrow={1} flexShrink={0} justifyContent="center" alignItems="center" p={5}>
                    <Routes marginBottom="auto">
                      <Route path="/" element={isAuth ? <Home /> : <LandingPage />} />
                      <Route path="home" element={<Home colorMode={colorMode} />} />
                      <Route path="photos" element={<Photos loading={loading} />} />
                      <Route path="community" element={<Community />} />
                      <Route path="friends" element={<Friends />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="register" element={<Register />} />
                      <Route path="login" element={<Login />} />
                      <Route path="upload" element={<Upload />} />
                      <Route path="contacts" element={<ContactForm />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/user/:id" element={<UserPhotos />} />

                    </Routes>
                    {location.pathname !== "/" && location.pathname !== "/community" && location.pathname !== "/home" ? <Footer /> : null}
                    {location.pathname === "/" ? <ThemeButton/> : null}
                  </Flex>
                </Flex>
              </Flex>
            </ChakraProvider>
          </FriendsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;