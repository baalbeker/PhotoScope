import { Box, Container, Text, Image, Flex } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const Logo = (props) => {
  return (
    <Box {...props}>
      <Image src={logo} alt="logo" />
    </Box>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box>
      <Container
        mt={"300px"}
        mb={-80}
        >
        <Flex align="center" justify="center">
          <Logo boxSize="100px" mt={10}/>
          <Text ml={4}>© 2023 PhotoScope. All rights reserved</Text>
        </Flex>
      </Container>
    </Box>
  );
  }