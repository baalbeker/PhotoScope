import { useState } from 'react';
import { Box, Heading,Text, Input, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { CONTACTMS } from '../../common/constants';

const Contact = () => {
  const initialState = {name: '',email: '',message: '',}
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
        to_email: 'samuilmnt@gmail.com',
      };

      await emailjs.send(
        'service_ror7v1s',
        'template_7tlsxj8',
        templateParams,
        'e3YIZAha09Ax2E_nr'
      );
      setFormData(initialState)
      toast.success("Thanks for your message!")
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email');
    }
  };

  return (
<Box textAlign="center" w={{ base: "90%", md: "60vh" }} px={{ base: 4, md: 10 }}>
  <Heading size="lg" mb={4}>Свържете се с нас</Heading>
  <Text  p={7}>{CONTACTMS}</Text>
  <form onSubmit={handleSubmit}>
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
    <Button type="submit" mt={4} colorScheme="teal">Изпрати</Button>
  </form>
  <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
</Box>

  );
};

export default Contact;