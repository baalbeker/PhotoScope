import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box 
      h="80%"
      mt="16%"
      alignContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
