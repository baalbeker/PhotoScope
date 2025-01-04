import { Box, Container, Text, Image, Flex } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <Box
      as="footer"
      mt="auto"
      width="100%"
      position="relative"
      bottom={0}
    >
      <Container>
        <Flex align="center" justify="center" py={4}>
          <Box boxSize="50px">
            <Image src={logo} alt="logo" />
          </Box>
          <Text fontSize="sm" ml={3}>
            © {new Date().getFullYear()} PhotoScope. All rights reserved
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
