import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';


const Form2 = ({ validateName, validateFamily, nameError, familyError }) => {
  const handleNameChange = (value) => {
    validateName(value);
  };
  const handleFamilyChange = (value) => {
    validateFamily(value);
  };

  return (
    <Box h="300px" overflowY="auto">
      <Heading size="lg" w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        What’s your first and last name? We’re happy you’re here!
      </Heading>
      <Flex>
        <Box mt={4}>
          <FormControl mr="5%" id="firstName" isRequired>
            <FormLabel fontWeight={"normal"}>First name</FormLabel>
            <Input
              type="text"
              placeholder="First name"
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </FormControl>
          {nameError && (
            <Text fontSize={11} color="red">
              {nameError}
            </Text>
          )}
        </Box>

        <Box mt={4} ml={3}>
          <FormControl id="last-name" isRequired>
            <FormLabel fontWeight={"normal"}>Last name</FormLabel>
            <Input
              type="text"
              placeholder="Last name"
              onChange={(e) => handleFamilyChange(e.target.value)}
            />
          </FormControl>
          {familyError && (
            <Text fontSize={11} color="red">
              {familyError}
            </Text>
          )}
        </Box>
      </Flex>
      <Text align={"center"} mt={4}>
        Let’s get to know a little about you.
      </Text>
      
    </Box>
  );
};

Form2.propTypes = {
  validateName: PropTypes.func.isRequired,
  validateFamily: PropTypes.func.isRequired,
  nameError: PropTypes.string,
  familyError: PropTypes.string,
};

export default Form2;
