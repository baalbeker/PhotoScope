import {Container,Stack,Flex,Box,Heading,Text,Button,Image,useColorModeValue} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Blob from './Blob';
import image from "../../assets/landing.jpg";


const GetStarted = ({ onGetStartedClick }) => {
  return (
    <Container maxW={"7xl"} mb={-15}>
      <Flex
        width="100%"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
      ></Flex>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 2, md: 20 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.400",
                zIndex: -1,
              }}
            >
              Вдъхнови се
            </Text>
            <br />
            <Text as={"span"} color={"purple.400"}>
              Бъди креативен!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
          PhotoScope е платформа, където фотографията оживява чрез социални връзки. Споделяйте снимки, правете нови приятели, харесвайте и коментирайте публикации, и се свързвайте с хора чрез чат. Превърнете своите моменти в истории и се присъединете към общността, която обича визуалното изкуство!
</Text>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"purple"}
              bg={"purple.400"}
              _hover={{ bg: "purple.500" }}
              onClick={onGetStartedClick}
            >
              Влизане
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "purple.400")}
          />
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={image}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

GetStarted.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired,
};

export default GetStarted;