import { Flex, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, Box, Image, Center, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../../assets/logo.png"
import FactBubble from '../../../components/InterestingFacts/FactBubble';

const Login = () => {

  const { setIsLoggedIn, email, setEmail, password, setPassword } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Incorrect email! Please try again.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password!  Please try again.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No such user existing! Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        console.log(error);
      });
  };

  return (

    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <FactBubble />
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Center>
          <ChakraLink as={RouterLink} to="/">
            <Image src={Logo} alt="Energize Logo" w={64} />
          </ChakraLink>
        </Center>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>to enjoy all of our cool features ✌️</Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <form onSubmit={signIn}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button type="submit" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500',}}>Sign in</Button>
                <Box>
                  <Text align={'center'}>Don't have an account?{" "}
                    <Button as={RouterLink} to="/register" colorScheme="blue" variant="link" size="md">Register now!</Button>
                  </Text>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer position="top-center" toastStyle={{position: 'relative', top: '40%',left: '30%', marginTop: '-10px'}}/>
    </Flex>
  );
}

export default Login;