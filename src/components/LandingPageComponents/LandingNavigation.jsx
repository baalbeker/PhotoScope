import { Flex, Text, Link, useColorModeValue, Stack, Image, IconButton, Box, Collapse } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from "../../assets/logo.png";
import { nav_items } from "../../common/constants";
import { useDisclosure } from '@chakra-ui/react';

function LandingNavigation() {
    const { isOpen, onToggle } = useDisclosure();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Flex
            borderBottom={1}
            borderStyle="solid"
            borderColor={useColorModeValue("gray.200", "gray.900")}
            align="center"
            justify="space-between"
            w="100%"
            p={4}
        >
            <Text>
                <Image
                    src={logo}
                    alt="Logo"
                    w="150px"
                    h="auto"
                    className="bg"
                    mt={-5}
                />
            </Text>

            {/* Hamburger Menu Button */}
            <IconButton
                aria-label="Toggle navigation"
                icon={<HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                onClick={onToggle}
                position="absolute"
                right="2"
                top="7"
                transform="translateY(-50%)"
            />

            {/* Desktop Navigation */}
            <Stack
                direction="row"
                spacing={4}
                display={{ base: "none", md: "flex" }}
            >
                {nav_items.map((navItem) => (
                    <Link
                        key={navItem.label}
                        p={3}
                        onClick={() => scrollToSection(navItem.href)}
                        fontSize="sm"
                        fontWeight={500}
                        color={useColorModeValue("gray.600", "gray.200")}
                        _hover={{
                            textDecoration: "none",
                            color: useColorModeValue("gray.800", "white"),
                        }}
                    >
                        {navItem.label}
                    </Link>
                ))}
            </Stack>

            {/* Mobile Navigation */}
            <Collapse in={isOpen}>
                <Box
                    display={{ base: "flex", md: "none" }}
                    flexDirection="column"
                    alignItems="flex-start"
                    mt={6}
                    bg={useColorModeValue("white", "gray.800")}
                    w="100%"
                    p={5}
                    borderRadius="md"
                    boxShadow="lg"
                >
                    {nav_items.map((navItem) => (
                        <Link
                            key={navItem.label}
                            p={2}
                            onClick={() => {
                                scrollToSection(navItem.href);
                                setTimeout(onToggle, 600);
                            }}
                            fontSize="sm"
                            fontWeight={500}
                            color={useColorModeValue("gray.600", "gray.200")}
                            _hover={{
                                textDecoration: "none",
                                color: useColorModeValue("gray.800", "white"),
                            }}
                        >
                            {navItem.label}
                        </Link>
                    ))}
                </Box>
            </Collapse>
        </Flex>
    );
}

export default LandingNavigation;
