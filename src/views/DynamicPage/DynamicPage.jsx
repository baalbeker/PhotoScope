import { useState } from "react";
import { Flex, Box, Text, Button, Textarea, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const DynamicPage = ({ dynamicRoutes, setDynamicRoutes }) => {
  const [codeInput, setCodeInput] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  const handleSaveText = async () => {
    if (codeInput.trim()) {
      try {
        const docRef = await addDoc(collection(db, "code"), {
          text: codeInput,
          timestamp: new Date(),
        });
        setCodeInput("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleFetchSavedTexts = async () => {
    const querySnapshot = await getDocs(collection(db, "code"));
    const texts = [];
    querySnapshot.forEach((doc) => {
      texts.push({ id: doc.id, ...doc.data() });
    });
    setSavedTexts(texts);
  };

  const handleTextClick = (text) => {
    setCodeInput(text); // Paste the clicked text into the textarea
  };

  const handleDeleteText = async (textId) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "code", textId));

      // Remove from local state
      setSavedTexts((prevTexts) => prevTexts.filter((text) => text.id !== textId));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleAddPage = () => {
    if (codeInput.trim()) {
      const newRoute = {
        path: `/govno-kod-${dynamicRoutes.length + 1}`,
        component: codeInput,
      };
      const updatedRoutes = [...dynamicRoutes, newRoute];
      setDynamicRoutes(updatedRoutes);
      setCodeInput("");
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="20px"
      background="linear-gradient(45deg, rgba(255, 111, 97, 0.7), rgba(59, 154, 225, 0.7), rgba(142, 68, 173, 0.7), rgba(26, 188, 156, 0.7))"
      backgroundSize="400% 400%"
      animation="waterEffect 5s ease infinite"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      maxWidth="800px"
      mt={14} 
      mb={5}
      width="full" // Full width for responsiveness
    >
      <Text
        fontSize={["1.5rem", "2rem"]} // Responsive font size
        color="white"
        mb="20px"
        fontWeight="600"
      >
        Говно код лаборатория
      </Text>

      <Textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        rows={20}
        placeholder="Изакай кода тук..."
        resize="none"
        focusBorderColor="blue.400"
        borderColor="gray.300"
        bg="white"
        fontSize="1rem"
        color="gray.800"
        width="100%"
        mb="20px"
      />

      <Flex justify="center" alignItems="center" mt="20px" gap="10px">
        <Button
          onClick={handleAddPage}
          colorScheme="blue"
          variant="solid"
          size="md"
          _hover={{ bg: "blue.600" }}
        >
          Създай
        </Button>

        <Button
          onClick={handleSaveText}
          colorScheme="blue"
          variant="solid"
          size="md"
          _hover={{ bg: "blue.600" }}
        >
          Запиши
        </Button>
      </Flex>

      <VStack align="stretch" mt="20px" width={["full", "79%"]} spacing={2}>
        {dynamicRoutes.map((route, index) => (
          <Link
            key={index}
            to={route.path}
            p="10px"
            bg="gray.100"
            color="gray.800"
            borderRadius="5px"
            _hover={{ bg: "gray.300" }}
            fontSize="1rem"
            textDecoration="none"
          >
            {`Отвори ${route.path}`}
          </Link>
        ))}
      </VStack>

      <Button
        onClick={handleFetchSavedTexts}
        mt="20px"
        colorScheme="blue"
        variant="solid"
        size="md"
        _hover={{ bg: "blue.600" }}
      >
        Покажи записани
      </Button>

      {savedTexts.length > 0 && (
        <Box mt="10px" width="full" display="flex" justifyContent="center">
          <Box width={["full", "80%"]} maxWidth="600px">
            {savedTexts.map((text, index) => (
              <Box
                key={index}
                mb="10px"
                p="15px"
                bg="gray.100"
                borderRadius="5px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="full"
                h="70px"
                _hover={{ bg: "gray.300" }}
              >
                <Text
                  noOfLines={1}
                  fontSize="1rem"
                  color="gray.800"
                  width="80%"
                >
                  {text.text}
                </Text>
                <Button
                  onClick={() => handleDeleteText(text.id)}
                  colorScheme="red"
                  size="sm"
                  _hover={{ bg: "red.600" }}
                >
                  kick
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <style>
        {`
          @keyframes waterEffect {
            0% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 50% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            75% {
              background-position: 50% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </Flex>
  );
};

export default DynamicPage;
