import { Box, Container, Stack, Text, useColorModeValue, Image, Link } from '@chakra-ui/react';
import logo from "../../assets/logo.png"
import PropTypes from 'prop-types';


const Logo = (props) => {
  return (
    <Box {...props}>
      <Image src={logo} alt="logo" />
    </Box>
  );
};


const MenuButton = ({ label, href }) => {
  return (
    <Link
      href={href}
      fontSize="sm"
      fontWeight={500}
      color={useColorModeValue('gray.700', 'gray.200')}
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('gray.800', 'whiteAlpha.900'),
      }}>
      {label}
    </Link>
  );
};


export default function SmallWithLogoLeft() {
  return (
    <Box
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={'-44'}
        justify={{ base: 'center', md: 'space-evenly' }}
        align={{ base: 'center', md: 'center' }}
        mt={20}
        mb={-10}>
        <Logo boxSize="100px" mt={10} />
        <Text>© 2023 PhotoScope. All rights reserved</Text>
        <Stack direction={'row'} spacing={3} ml={10}>
          <MenuButton label={'Home'} href={'#home'} />
          <MenuButton label={'Our Users'} href={'#our-users'} />
          <MenuButton label={'About'} href={'#about'} />
          <MenuButton label={'How it works?'} href={'#howItWorks'} />
        </Stack>
      </Container>
    </Box>
  );
}

MenuButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};