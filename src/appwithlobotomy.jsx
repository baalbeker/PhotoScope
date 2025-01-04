import { ChakraProvider, Flex, useColorMode } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ThemeButton from "./components/ThemeButton/ColorModeButton";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./views/NotFound/NotFound";
import Register from "./views/Authentication/Register/Register";
import Profile from "./views/Profile/Profile";
import Photos from "./views/Photos/Photos";
import Community from "./views/Community/Community";
import Login from "./views/Authentication/Login/Login";
import LandingPage from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import UserMenu from "./components/UserMenu/UserMenu";
import Friends from "./views/Friends/Friends";
import Upload from "./components/Upload/Upload";
import Contact from "./views/Contact/Contact";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";

// import lob1 from "./assets/lob/lob1.jpg";
// import lob2 from "./assets/lob/lob2.jpg";
// import lobsound from "./assets/lob/lobsound.mp3";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = localStorage.getItem("isAuth") === "true";

  useEffect(() => {
    if (isAuth && location.pathname === "/") {
      navigate("/home");
    } else {
      setIsLoading(false);
    }
  }, [isAuth, location.pathname, navigate]);

  const isPrivateRoute =
    location.pathname !== "/" &&
    location.pathname !== "/register" &&
    location.pathname !== "/login";


//LOBOTOMY
  // const images = [lob1, lob2];
  // const [overlayImage, setOverlayImage] = useState(null);
  // const [overlayVisible, setOverlayVisible] = useState(false);

  // const showRandomImage = () => {
  //   const randomImage = images[Math.floor(Math.random() * images.length)];
  //   setOverlayImage(randomImage);
  //   setOverlayVisible(true);
  //   const audio = new Audio(lobsound);
  //   audio.play();
  //   setTimeout(() => {
  //     setOverlayVisible(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     showRandomImage();

  //     setTimeout(() => {
  //       setOverlayVisible(false);
  //     }, 1000);
  //   }, Math.random() * 10000 + 80000);

  //   return () => clearInterval(interval);
  // }, []);
//-------------------------


  if (isLoading) {
    return null;
  }

  return (
    <AuthProvider>
      <ChakraProvider>
        <Flex>
          {isPrivateRoute && (
            <>
              <Navigation colorMode={colorMode} />
              <UserMenu />
            </>
          )}

          <Flex
            as="main"
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              as="main"
              direction="column"
              minHeight="100vh"
              flexGrow={1}
              flexShrink={0}
              justifyContent="center"
              alignItems="center"
              w={{ base: "full", md: "auto" }}
            >
              <Routes marginBottom="auto">
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="home"
                  element={<PrivateRoute element={<Home />} />}
                />
                <Route
                  path="photos"
                  element={<PrivateRoute element={<Photos />} />}
                />
                <Route
                  path="community"
                  element={<PrivateRoute element={<Community />} />}
                />
                <Route
                  path="friends"
                  element={<PrivateRoute element={<Friends />} />}
                />
                <Route
                  path="profile"
                  element={<PrivateRoute element={<Profile />} />}
                />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="upload"
                  element={<PrivateRoute element={<Upload />} />}
                />
                <Route
                  path="contacts"
                  element={<PrivateRoute element={<Contact />} />}
                />
                <Route
                  path="/user/:id"
                  element={<PrivateRoute element={<UserPhotos />} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ThemeButton />
            </Flex>
          </Flex>
        </Flex>

        {/* {overlayVisible && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${overlayImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 9999,
            }}
          />
        )} */}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
