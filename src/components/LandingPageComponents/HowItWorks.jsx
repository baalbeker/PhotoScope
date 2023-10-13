import { useState } from "react";
import { Box, Button, VStack, Divider, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { HOW_IT_WORKS_STEPS } from "../../common/constants";
import PropTypes from 'prop-types';

const HowItWorks = ({ onGetStartedClick }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep !== HOW_IT_WORKS_STEPS.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };


    const handleBack = () => {
        if (activeStep !== 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    return (
        <Box w="100%" maxWidth="70%" m="auto" borderWidth="2px" borderColor="grey.200" boxShadow="lg" borderRadius={40} h={400}>
            <VStack spacing={8} align="center" mt={6}>
                <Heading size="lg" textAlign="center" borderBottom={"4px"} borderBottomColor={"purple"}>
                    How It Works?
                </Heading>
                <Divider orientation="horizontal" />
                <Flex direction="column" justify="space-between" w="100%" h="100%">
                    <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        flexWrap="wrap"
                        flexGrow={1}
                        flexBasis={0}
                    >
                        {activeStep !== 0 && (
                            <Button
                                aria-label="left-arrow"
                                variant="ghost"
                                position="left"
                                transform={"translate(0%, -50%)"}
                                zIndex={2}
                                onClick={handleBack}
                            >
                                <BiLeftArrowAlt size="25px" />
                            </Button>
                        )}
                        <Flex
                            direction="row"
                            maxW={"container.xl"}
                            w="100%"
                            h="130px"
                            justify="center"
                            alignItems="center"
                            mt={10}
                            flexGrow={1}
                            flexBasis={0}
                        >
                            <Box bgImage={`url(${HOW_IT_WORKS_STEPS[activeStep].bgImage})`} bgSize="cover" bgPos="center" p={3} w="60%">
                                <Flex
                                    direction="column"
                                    h="100%"
                                    justify="space-between"
                                    bg="whiteAlpha.700"
                                    p={1}
                                    width="100%"
                                    overflow="auto"
                                    minH="100px"
                                    maxH={"-moz-fit-content"}
                                    maxW={"80%"}
                                    ml={20}
                                >
                                    <VStack spacing={2} align="start">
                                        <Heading size="md">{`Step ${activeStep + 1}: ${HOW_IT_WORKS_STEPS[activeStep].title}`}</Heading>
                                        <Text>{HOW_IT_WORKS_STEPS[activeStep].content}</Text>
                                    </VStack>
                                </Flex>
                            </Box>
                            <Box w="40%">
                                <Flex direction="row" ml={"10"}>
                                    <Image src={HOW_IT_WORKS_STEPS[activeStep].icon} boxSize="45%" objectFit="contain" ml={0} />
                                    {HOW_IT_WORKS_STEPS[activeStep].icon2 && (
                                        <Image src={HOW_IT_WORKS_STEPS[activeStep].icon2} boxSize="45%" objectFit="contain" ml={-10} />
                                    )}
                                </Flex>
                            </Box>
                        </Flex>
                        {activeStep !== HOW_IT_WORKS_STEPS.length - 1 && (
                            <Button
                                aria-label="right-arrow"
                                variant="ghost"
                                position="right"
                                transform={"translate(0%, -50%)"}
                                zIndex={2}
                                onClick={handleNext}
                            >
                                <BiRightArrowAlt size="25px" />
                            </Button>
                        )}
                    </Flex>
                    {activeStep === HOW_IT_WORKS_STEPS.length - 1 && (
                        <Button
                            onClick={onGetStartedClick}
                            alignSelf="center"
                            h={10}
                            w={36}
                            colorScheme={"purple"}
                            bg={"purple.400"}
                            _hover={{ bg: "purple.500" }}
                            top={10}
                            mt={2}
                        >
                            Get Started
                        </Button>
                    )}
                </Flex>
            </VStack>
        </Box>
    );
};

HowItWorks.propTypes = {
    onGetStartedClick: PropTypes.func.isRequired,
  };

export default HowItWorks;