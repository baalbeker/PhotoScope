import { useState} from 'react';
import { Flex, Box, Progress, Image, Button, Stack, useColorModeValue, ButtonGroup } from '@chakra-ui/react';
import { db, auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../../assets/logo.png"
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';
import Loading from '../../../components/Loading/Loading';

const Register = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [regName, setRegName] = useState("")
  const [regFamily, setRegFamily] = useState("")
  const [regUsername, setRegUsername] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [familyError, setFamilyError] = useState('');

  const usersCollectionRef = collection(db, 'users');
  const usersQuery = query(usersCollectionRef);

  const validateUsername = async (username) => {
    if (username.length < 2 || username.length > 20) {
      setUsernameError("Username must be between 2 and 20 characters");
    } else {
      const querySnapshot = await getDocs(usersQuery);
      const existingUser = querySnapshot.docs.find(
        (doc) => doc.data().username === username
      );
      if (existingUser) {
        setUsernameError("Username already exists");
      } else {
        setUsernameError("");
        setRegUsername(username)
      }
    }
  };

  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("email", "==", email))
      );
      if (!querySnapshot.empty) {
        setEmailError("Email already exists");
      } else {
        setEmailError("");
        setRegEmail(email);
      }
    }
  };

  const validatePassword = async (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
      setRegPassword(password);
    }
  }

  const validateName = async (name) => {
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters');
    } else {
      setNameError('');
      setRegName(name);
    }
  }

  const validateFamily = async (family) => {
    if (family.length < 3) {
      setFamilyError('Family must be at least 3 characters');
    } else {
      setFamilyError('');
      setRegFamily(family);
    }
  }

  const addUser = async () => {
    const usersCollection = collection(db, "users")

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const docRef = await addDoc(usersCollection, {
      name: regName,
      family: regFamily,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: "user",
      isBlocked: false,
      id: auth.currentUser.uid,
      photoCount: 0,
      dateJoined: formattedDate,
    });

    const docID = docRef.id;
    const dataWithDocID = { ...addUser, docID: docID };
    await updateDoc(docRef, dataWithDocID);
  }

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${regName} ${regFamily}`
    })
  }

  const signUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(() => {
        updateName();
      })
      .then(() => {
        addUser()
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/home")
      });
  };

  const checkFormValidity = () => {
    switch (step) {
      case 2:
        return !regName || !regFamily;
      case 3:
        return !regUsername || !regEmail || !regPassword;
      default:
        return false;
    }
  };

  return (
<Flex w="90%" align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
  <Stack maxW={{ base: "100%", sm: "80%", md: "md" }} w="100%" px={4}>
    <Stack align={"center"}>
      <Image src={Logo} alt="Energize Logo" w={64} />
      {isLoading && <Loading size="xl" color="teal.500" />}
    </Stack>
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={{ base: 4, md: 3 }} // Adjust padding for smaller screens
    >
      <Stack spacing={4}>
        <Progress hasStripe value={progress} mb="5%" isAnimated />

        {step === 1 ? (
          <Form1 />
        ) : step === 2 ? (
          <Form2
            validateName={validateName}
            validateFamily={validateFamily}
            nameError={nameError}
            familyError={familyError}
          />
        ) : step === 3 ? (
          <Form3
            validateUsername={validateUsername}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            usernameError={usernameError}
            emailError={emailError}
            passwordError={passwordError}
          />
        ) : null}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" direction={{ base: "column", md: "row" }} justifyContent="space-between">
            <Button
              onClick={() => {
                if (step === 1) {
                  navigate("/login");
                } else {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }
              }}
              colorScheme="teal"
              variant="solid"
              w={{ base: "100%", sm: "45%", md: "7rem" }} // Adjust width for smaller screens
              mb={{ base: "1rem", sm: "0", md: "0" }} // Adjust margin for smaller screens
              mr={{ base: "0", sm: "5%" }}
            >
              Back
            </Button>

            <Button
              w={{ base: "100%", sm: "45%", md: "7rem" }}
              onClick={
                step === 3
                  ? signUp
                  : () => {
                      setStep(step + 1);
                      setProgress(progress + 33.33);
                    }
              }
              colorScheme="teal"
              variant="outline"
              isDisabled={checkFormValidity()}
            >
              {step === 3 ? "Sign up" : "Next"}
            </Button>
          </Flex>
        </ButtonGroup>
      </Stack>
    </Box>
  </Stack>
</Flex>


  );
};

export default Register;