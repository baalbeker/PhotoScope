import { Box, Heading, Text } from '@chakra-ui/react';

const Form1 = () => {
  return (
      <Box overflowY="auto">
        <Heading 
          size={["lg", "xl"]} 
          w="100%" 
          textAlign={'center'} 
          fontWeight="normal" 
          mb="2%"
        >
          Welcome!
        </Heading>
        <Text 
          mt="10" 
          fontSize={["18px", "21px"]} 
          textAlign="center"
        >
          Let’s customize <strong>PhotoScope</strong> for your photos.
        </Text>
      </Box>
  );
};

export default Form1;
