import {Box,Container,Stack,Text,useColorModeValue,Image,Link,} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import { nav_items } from '../../common/constants';

function LandingFooter() {

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 4, md: 0 }}
        justify={{ base: 'center', md: 'space-between' }}
        align="center"
        mt={20}
        mb={-10}
      >
        <Box>
          <Image src={logo} alt="Logo" boxSize="100px" mt={10} />
        </Box>
        <Text>© 2023 PhotoScope. All rights reserved</Text>
        <Stack direction={'row'} spacing={3} ml={10}>
          {nav_items.map((navItem) => (
            <Link
              key={navItem.label}
              p={2}
              onClick={() => scrollToSection(navItem.href)}
              fontSize='sm'
              fontWeight={500}
              color={useColorModeValue('gray.600', 'gray.200')}
              _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('gray.800', 'white'),
              }}
          >
              {navItem.label}
          </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default LandingFooter;

LandingFooter.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
};
