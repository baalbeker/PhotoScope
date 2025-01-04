import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const Form3 = ({
  validateUsername,
  validateEmail,
  validatePassword,
  usernameError,
  emailError,
  passwordError,
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

  return (
    <>
      <Box
        h="300px"
        overflowY="auto"
      >
        <Box>
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
    </>
  );
};

Form3.propTypes = {
  validateUsername: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validatePassword: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
};

export default Form3;
