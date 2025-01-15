import { useState } from 'react';
import { Flex, Box, Image, Button, Stack, useColorModeValue, ButtonGroup } from '@chakra-ui/react';
import { db, auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../../assets/logo.png";
import Forms from './Forms';
import Loading from '../../../components/Loading/Loading';
// import cj from '../../../assets/cj.mp3'


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [regName, setRegName] = useState("");
  const [regFamily, setRegFamily] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [familyError, setFamilyError] = useState("");

  const usersCollectionRef = collection(db, "users");
  const usersQuery = query(usersCollectionRef);

        // const audio = new Audio(cj);
        // const toggle = () => {
        //   audio.play();
        // };

  const validateUsername = async (username) => {
    if (username.length < 2 || username.length > 20) {
      setUsernameError(
        "Потребителското име трябва да бъде между 2 и 20 символа"
      );
    } else {
      setUsernameError("");
      const querySnapshot = await getDocs(usersQuery);
      const existingUser = querySnapshot.docs.find(
        (doc) => doc.data().username === username
      );
      if (existingUser) {
        setUsernameError("Потребителското име вече съществува");
      } else {
        setRegUsername(username);
      }
    }
  };

  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Невалиден имейл адрес");
    } else {
      setEmailError("");

      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("email", "==", email))
      );

      if (!querySnapshot.empty) {
        setEmailError("Имейлът вече съществува");
      } else {
        setRegEmail(email);
      }
    }
  };

  const validatePassword = async (password) => {
    if (password.length < 6) {
      setPasswordError("Паролата трябва да е поне 6 символа");
    } else {
      setPasswordError("");
      setRegPassword(password);
    }
  };

  const validateName = async (name) => {
    if (name.length < 3) {
      setNameError("Името трябва да е поне 3 символа");
    } else {
      setNameError("");
      setRegName(name);
    }
  };

  const validateFamily = async (family) => {
    if (family.length < 3) {
      setFamilyError("Фамилията трябва да е поне 3 символа");
    } else {
      setFamilyError("");
      setRegFamily(family);
    }
  };

  const addUser = async () => {
    const usersCollection = collection(db, "users");

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const docRef = await addDoc(usersCollection, {
      name: regName,
      family: regFamily,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: "user",
      isBlocked: false,
      id: auth.currentUser.uid,
      dateJoined: formattedDate,
    });

    const docID = docRef.id;
    const dataWithDocID = { ...addUser, docID: docID };
    await updateDoc(docRef, dataWithDocID);
  };

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${regName} ${regFamily}`,
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(() => {
        updateName();
      })
      .then(() => {
        addUser();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        // toggle()
        navigate("/home");
      });
  };

  const checkFormValidity = () => {
    return !regName || !regFamily || !regUsername || !regEmail || !regPassword;
  };

  return (
    <Flex
      w="90%"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack maxW={{ base: "100%", sm: "80%", md: "md" }} w="100%" px={4}>
        <Stack align={"center"}>
          <Image src={Logo} alt="Energize Logo" w={64} />
          {isLoading && <Loading size="xl" color="teal.500" />}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={{ base: 4, md: 3 }}
        >
          <Stack spacing={4}>
            <Forms
              validateName={validateName}
              validateFamily={validateFamily}
              validateUsername={validateUsername}
              validateEmail={validateEmail}
              validatePassword={validatePassword}
              nameError={nameError}
              familyError={familyError}
              usernameError={usernameError}
              emailError={emailError}
              passwordError={passwordError}
            />

            <ButtonGroup mt={{ base: "-5", md: "-20" }}>
              <Flex
                w="100%"
                direction={{ base: "column", md: "row" }}
                justifyContent="space-around"
              >
                <Button
                  w={{ base: "100%", sm: "45%", md: "9rem" }}
                  onClick={signUp}
                  colorScheme="twitter"
                  variant="solid"
                  isDisabled={checkFormValidity()}
                  mb={3}
                >
                  Регистрация
                </Button>

                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  _hover={{ bg: "gray.200" }}
                  w={{ base: "100%", sm: "45%", md: "9rem" }}
                >
                  Назад
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
