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
    <Box h="300px" overflowY="auto" >
      <Heading
        size="lg"
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb={{ base: 4, md: 2 }}
        fontSize={{ base: "lg", md: "xl" }}
      >
        What’s your first and last name? We’re happy you’re here!
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <Box mt={4} w={{ base: "100%", md: "45%" }}>
          <FormControl mr={{ md: "5%" }} id="firstName" isRequired>
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

        <Box mt={4} ml={{ base: 0, md: 3 }} w={{ base: "100%", md: "45%" }}>
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
