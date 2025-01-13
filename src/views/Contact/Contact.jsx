import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Container,
  Flex,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import { CONTACTMS } from "../../common/constants";
import goalheader from "../../assets/img5.jpg";

const Contact = () => {
  const initialState = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const templateParams = {
        from_name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "samuilmnt@gmail.com",
      };

      await emailjs.send(
        "service_ror7v1s",
        "template_7tlsxj8",
        templateParams,
        "e3YIZAha09Ax2E_nr"
      );
      setFormData(initialState);
      toast.success("Thanks for your message!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    }
  };

  return (
    <Container h="82vh" minWidth="100%" align="center" overflowY="scroll">
      <Flex direction="column" align="flex-start" justify="flex-start">
        <Box
          bgImage={goalheader}
          bgSize="cover"
          bgPosition="center"
          w="100%"
          h={{ base: "10vh", md: "20vh" }}
          rounded="md"
          mb={4}
          p={6}
        >
          <Text
            mt={{ base: "1", md: "6vh" }}
            textAlign="left"
            fontSize="25px"
            fontWeight="bold"
            color="white"
          >
            Свържете се с нас
          </Text>
        </Box>
        <Text p={7}>{CONTACTMS}</Text>
      </Flex>
  
      {/* New Flex container for the form */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100%"
        maxW="600px"
        m="0 auto"
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormControl>
            <FormLabel htmlFor="name">Име</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="email">Имейл</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="message">Съобщение</FormLabel>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="teal" width="100%">
            Изпрати
          </Button>
        </form>
        <ToastContainer position="top-center" style={{ zIndex: 2001 }} />
      </Flex>
    </Container>
  );
  
};

export default Contact;
