import { Avatar, Box, chakra, Flex, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { TESTIMONIALS } from '../../common/constants';
import PropTypes from 'prop-types';

function TestimonialCard(props) {
    const { name, role, content, avatar } = props;
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'md'}
            p={3}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <Flex direction={'column'} textAlign={'left'} justifyContent={'space-between'}>
                <chakra.p
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    fontSize={{ base: '14px', md: '15px' }} // Adjust font size for smaller screens
                    pb={4}
                >
                    {content}
                </chakra.p>
                <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={{ base: '14px', md: '16px' }}>
                    {name}
                    <chakra.span
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        color={'gray.500'}
                    >
                        {' '} - {role}
                    </chakra.span>
                </chakra.p>
            </Flex>
            <Avatar
                src={avatar}
                height={'80px'}
                width={'80px'}
                alignSelf={'center'}
                m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
            />
        </Flex>
    );
}

export default function UserTestimonials() {
    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
            overflow={'hidden'}
        >
<Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>

    <chakra.h1
        py={5}
        fontSize={{ base: '32px', sm: '40px', md: '48px' }} // Регулирайте размера на шрифта за различни размери на екрани
        fontFamily={'Work Sans'}
        fontWeight={'bold'}
        color={useColorModeValue('gray.700', 'gray.50')}
    >
        Вие сте в добра компания
    </chakra.h1>
    <chakra.h2
        margin={'auto'}
        width={{ base: '90%', sm: '80%', lg: '70%' }} // Регулирайте ширината за отзивчивост
        fontFamily={'Inter'}
        fontWeight={'bold'}
        color={useColorModeValue('gray.500', 'gray.400')}
    >
        Разберете защо фотографите избират PhotoScope, за да постигнат своите креативни амбиции!
    </chakra.h2>
</Box>

            <SimpleGrid
                columns={{ base: 1, sm: 2, xl: 2 }} // Ensures one column on mobile, two columns on larger screens
                spacing={{ base: 8, sm: 10, md: 12, lg: 16 }} // Adjust spacing based on screen size
                mt={16}
                mb={16}
                mx={'auto'}
                fontWeight={'bold'}
                fontFamily={'sans-serif'}
                fontSize={'md'}
            >
                {TESTIMONIALS.map((testimonial, index) => (
                    <TestimonialCard key={index} index={index} {...testimonial} />
                ))}
            </SimpleGrid>
        </Flex>
    );
}

TestimonialCard.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};
