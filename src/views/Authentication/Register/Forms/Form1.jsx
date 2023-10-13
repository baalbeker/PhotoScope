import { Box, Heading, Text } from '@chakra-ui/react';


const Form1 = () => {
    return (
        <>
            <Box h="200px" overflowY="auto">
                <Heading size="xl" w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Welcome!
                </Heading>
                <Text mt="10" fontSize="21px">
                    Let’s customize <strong>PhotoScope</strong> for your photos.
                </Text>
            </Box>
        </>
    );
};

export default Form1
