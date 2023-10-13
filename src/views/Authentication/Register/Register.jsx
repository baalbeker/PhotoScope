import { useState} from 'react';
import { Flex, Box, Progress, Image, Button, Stack, useColorModeValue, ButtonGroup } from '@chakra-ui/react';
import { db, auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png"
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';
import Loading from '../../../components/Loading/Loading';
import { toast } from "react-toastify";

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

  /**
 * Validates the username.
 * @param {string} username - The username to be validated.
 * @returns {Promise<void>}
 */
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

  /**
 * Validates the email address.
 * @param {string} email - The email address to be validated.
 * @returns {Promise<void>}
 */
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

  /**
 * Validates the password.
 * @param {string} password - The password to be validated.
 * @returns {Promise<void>}
 */
  const validatePassword = async (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
      setRegPassword(password);
    }
  }

  /**
 * Validates the name.
 * @param {string} name - The name to be validated.
 * @returns {Promise<void>}
 */
  const validateName = async (name) => {
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters');
    } else {
      setNameError('');
      setRegName(name);
    }
  }

  /**
 * Validates the family.
 * @param {string} family - The family name to be validated.
 * @returns {Promise<void>}
 */
  const validateFamily = async (family) => {
    if (family.length < 3) {
      setFamilyError('Family must be at least 3 characters');
    } else {
      setFamilyError('');
      setRegFamily(family);
    }
  }

  /**
 * Adds a user to the database.
 * @param {number} bmr - The Basal Metabolic Rate (BMR) of the user.
 * @param {object} goals - The user's goals object.
 * @returns {Promise<void>}
 */
  const addUser = async () => {
    const usersCollection = collection(db, "users")

    const docRef = await addDoc(usersCollection, {
      name: regName,
      family: regFamily,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: "user",
      isBlocked: false,
      id: auth.currentUser.uid,
    });

    const docID = docRef.id;
    const dataWithDocID = { ...addUser, docID: docID };
    await updateDoc(docRef, dataWithDocID);
  }

  /**
 * Updates the name of the current user's profile.
 * @returns {void}
 */
  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${regName} ${regFamily}`
    })
  }

  /**
 * Sign up a new user.
 * @param {Event} e - The event object from the form submission.
 * @returns {void}
 */
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image src={Logo} alt="Energize Logo" w={64} />
          {isLoading && <Loading size="xl" color="teal.500" />}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              mx="5%"
              isAnimated
            ></Progress>

            {step === 1 ? (
              <Form1 />
            ) : step === 2 ? (
              <Form2
                validateName={validateName}
                validateFamily={validateFamily}
                nameError={nameError}
                familyError={familyError} />
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
              <Flex w="100%" justifyContent="space-between">
                <Flex>
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
                    w="7rem"
                    mr="5%"
                  >
                    Back
                  </Button>

                  <Button
                    w="7rem"
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
              </Flex>
            </ButtonGroup>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;