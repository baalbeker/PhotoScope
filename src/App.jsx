import { ChakraProvider, Flex, useColorMode } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { auth} from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"
import { FriendsContext } from "./context/FriendsContext";
import { useFetchFriends } from "./services/useFetchFriends";
import { useFetchPhotos } from "./services/useFetchPhotos";
import { useFetchUser } from "./services/useFetchUser";
import signUserOut from "./services/signUserOut";
import { useCheckAuth } from "./services/useCheckAuth";

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

  useCheckAuth(setIsAuth, setPhotoURL, setUserID, photoURL,setAdmin);
  useFetchUser(userID,setIsBlocked,setAdmin,setUserDocID,setPhotoCount,setName,setFamily,setUsername,setEmail,setPassword);
  useFetchPhotos(setPhotos, setLoading);
  useFetchFriends(userDocID, setRequests, setFriends);
  const handleSignOut = signUserOut(auth, navigate);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isAuth,
        setIsLoggedIn: setIsAuth,
        isAdmin,
        setAdmin,
        signOut: handleSignOut,
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
                {isAuth && location.pathname !== "/register" && location.pathname !== "/login" && <Navigation colorMode={colorMode} />}
                {isAuth && location.pathname !== "/register" && location.pathname !== "/login" && <UserMenu />}
                <Flex as="main" flexGrow={1} justifyContent="center" alignItems="center">
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
                    <ThemeButton/>
                  </Flex>
                </Flex>
              </Flex>
            </ChakraProvider>
          </FriendsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;