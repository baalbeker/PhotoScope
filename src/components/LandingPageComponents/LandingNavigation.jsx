import { Flex, Text, Link, useColorModeValue, Stack, Image } from '@chakra-ui/react';
import logo from "../../assets/logo.png";
import { nav_items } from "../../common/constants"

function LandingNavigation() {

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Flex
            borderBottom={1}
            borderStyle='solid'
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align='center'
            justify='space-between'
            w='100%'
            p={4}
        >
            <Text>
                <Image
                    src={logo}
                    alt='Logo'
                    w='150px'
                    h='auto'
                    className='bg'
                    mt={-5}
                />
            </Text>
            <Stack direction='row' spacing={4} display={{ base: 'none', md: 'flex' }}>
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
        </Flex>
    );
}

export default LandingNavigation;
