import { ChakraProvider, Flex, useColorMode } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
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
import Chat from './views/Chat/Chat'
import DynamicPage from "./views/DynamicPage/DynamicPage";
import DynamicContent from "./views/DynamicPage/DynamicContent";
import FortuneWheel from "./views/FortuneWheel/FortuneWheel";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const isAuth = localStorage.getItem("isAuth") === "true";

  useEffect(() => {
    if (isAuth && location.pathname === "/") navigate("/home");
    else setIsLoading(false);
  }, [isAuth, location.pathname, navigate]);

  const isPrivateRoute =
    location.pathname !== "/" &&
    location.pathname !== "/register" &&
    location.pathname !== "/login";

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
                <Route path="home" element={<PrivateRoute element={<Home />} />} />
                <Route path="photos" element={<PrivateRoute element={<Photos />} />} />
                <Route path="community" element={<PrivateRoute element={<Community />} />} />
                <Route path="friends" element={<PrivateRoute element={<Friends />} />} />
                <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="upload" element={<PrivateRoute element={<Upload />} />} />
                <Route path="contacts" element={<PrivateRoute element={<Contact />} />} />
                <Route path="/fortune-wheel" element={<PrivateRoute element={<FortuneWheel />} />} />
                <Route path="/user/:id" element={<PrivateRoute element={<UserPhotos />} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/chat/:recipientDocID" element={<PrivateRoute element={<Chat />} />} />
                <Route path="/dynamic" element={<DynamicPage dynamicRoutes={dynamicRoutes} setDynamicRoutes={setDynamicRoutes} />} />
                {dynamicRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={<DynamicContent componentCode={route.component} />} />
                ))}
              </Routes>
              <ThemeButton />
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
