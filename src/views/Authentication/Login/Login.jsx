import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Box,
  Image,
  Center,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  Link as ChakraLink,
  useNavigate,
} from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../../assets/logo.png";
// import daddy from "../../../assets/daddy.mp3";


const Login = () => {
  const { setIsLoggedIn, email, setEmail, password, setPassword } =
    useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    // const audio = new Audio(daddy);
    // const toggle = () => {
    //   audio.play();
    // };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsLoggedIn(true);
        // toggle()
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-credential") {
          toast.error("Incorrect email or password! Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };
  

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} maxW={"lg"} py={12} px={6}>
        <Center>
          <ChakraLink as={RouterLink} to="/">
            <Image
              src={Logo}
              alt="Energize Logo"
              w={{ base: "50%", sm: "64" }}
            />
          </ChakraLink>
        </Center>
        <Stack align={"center"}>
          <Heading fontSize={{ base: "3xl", sm: "4xl" }}>
            Влезте в профила си
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }} color={"gray.600"}>
            за да използвате всички предимства ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={signIn}>
              <FormControl id="email">
                <FormLabel>Имейл</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Парола</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack mt={5}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Влез
                </Button>
                <Button
                  as={RouterLink}
                  to="/"
                  variant="outline"
                  _hover={{ bg: "gray.200" }}
                >
                  Назад
                </Button>
                <Box>
                  <Text align={"center"}>
                    Нямате профил?{" "}
                    <Button
                      as={RouterLink}
                      to="/register"
                      colorScheme="blue"
                      variant="link"
                      size="md"
                    >
                      Регистрация
                    </Button>
                  </Text>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer
      position="top-center"
      toastStyle={{
        position: "relative",
        top: ["10%", "30%", "40%"],
        left: ["10%", "20%", "30%"],
      }}
    />
    </Flex>
  );
};

export default Login;
