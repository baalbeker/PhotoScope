import { Box, Container, Text, Image, Flex } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
      <Container mt="8vh" position={"relative"} bottom={0}>
        <Flex align="center" justify="center">
          <Box boxSize="100px">
            <Image src={logo} alt="logo" />
          </Box>
          <Text ml={4}>© 2023 PhotoScope. All rights reserved</Text>
        </Flex>
      </Container>
  );
}