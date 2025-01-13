import { Box, FormControl, FormLabel, Input, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const Forms = ({
  validateUsername,
  validateEmail,
  validatePassword,
  validateName,
  validateFamily,
  usernameError,
  emailError,
  passwordError,
  nameError,
  familyError,
}) => {
  const handleUsernameChange = (value) => {
    validateUsername(value);
  };
  const handleEmailChange = (value) => {
    validateEmail(value);
  };
  const handlePasswordChange = (value) => {
    validatePassword(value);
  };
  const handleNameChange = (value) => {
    validateName(value);
  };
  const handleFamilyChange = (value) => {
    validateFamily(value);
  };

  return (
    <Box h="500px" overflowY="auto">
      <Heading
        size="lg"
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb={{ base: 4, md: 2 }}
        fontSize={{ base: "lg", md: "xl" }}
      >
        Какви са вашите имена и данни?
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
        <Box mt={4} w={{ base: "100%", md: "45%" }}>
          <FormControl id="first-name" isRequired>
            <FormLabel fontWeight={"normal"}>Име</FormLabel>
            <Input
              type="text"
              placeholder="Име"
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </FormControl>
          {nameError && <Text fontSize={11} color="red">{nameError}</Text>}
        </Box>

        <Box mt={4} ml={{ base: 0, md: 3 }} w={{ base: "100%", md: "45%" }}>
          <FormControl id="last-name" isRequired>
            <FormLabel fontWeight={"normal"}>Фамилия</FormLabel>
            <Input
              type="text"
              placeholder="Фамилия"
              onChange={(e) => handleFamilyChange(e.target.value)}
            />
          </FormControl>
          {familyError && <Text fontSize={11} color="red">{familyError}</Text>}
        </Box>
      </Flex>

      <Box mt={4}>
        <FormControl isRequired>
          <FormLabel fontSize={["14px", "15px", "16px", "17px"]} fontWeight="normal">
            Никнейм
          </FormLabel>
          <Input
            type="text"
            placeholder="Прякор"
            onChange={(e) => handleUsernameChange(e.target.value)}
            fontSize={["14px", "15px", "16px", "17px"]}
          />
        </FormControl>
        {usernameError && <Text fontSize={11} color="red">{usernameError}</Text>}
      </Box>

      <Box mt={4}>
        <FormControl isRequired>
          <FormLabel fontSize={["14px", "15px", "16px", "17px"]} fontWeight="normal">
            Имейл
          </FormLabel>
          <Input
            type="email"
            placeholder="Имейл"
            onChange={(e) => handleEmailChange(e.target.value)}
            fontSize={["14px", "15px", "16px", "17px"]}
          />
        </FormControl>
        {emailError && <Text fontSize={11} color="red">{emailError}</Text>}
      </Box>

      <Box mt={4}>
        <FormControl isRequired>
          <FormLabel fontSize={["14px", "15px", "16px", "17px"]} fontWeight="normal">
            Парола
          </FormLabel>
          <Input
            type="password"
            placeholder="Парола"
            onChange={(e) => handlePasswordChange(e.target.value)}
            fontSize={["14px", "15px", "16px", "17px"]}
          />
        </FormControl>
        {passwordError && <Text fontSize={11} color="red">{passwordError}</Text>}
      </Box>
    </Box>
  );
};

Forms.propTypes = {
  validateUsername: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validatePassword: PropTypes.func.isRequired,
  validateName: PropTypes.func.isRequired,
  validateFamily: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  nameError: PropTypes.string,
  familyError: PropTypes.string,
};

export default Forms;
