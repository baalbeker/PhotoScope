import {Avatar,Box,chakra,Flex,SimpleGrid,useColorModeValue,} from '@chakra-ui/react';
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
        rounded={'xl'}
        p={10}
        mb={10}
        justifyContent={'space-between'}
        position={'relative'}
        bg={useColorModeValue('white', 'gray.800')}
        >
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}>
          <chakra.p
            fontFamily={'Inter'}
            fontWeight={'medium'}
            fontSize={'15px'}
            pb={4}>
            {content}
          </chakra.p>
          <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
            {name}
            <chakra.span
              fontFamily={'Inter'}
              fontWeight={'medium'}
              color={'gray.500'}>
              {' '}
              - {role}
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
        overflow={'hidden'}>
        <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
          <chakra.h3
            fontFamily={'Work Sans'}
            fontWeight={'bold'}
            fontSize={20}
            textTransform={'uppercase'}
            color={'purple.400'}>
            People love us
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={'Work Sans'}
            fontWeight={'bold'}
            color={useColorModeValue('gray.700', 'gray.50')}>
            You're in good company
          </chakra.h1>
          <chakra.h2
            margin={'auto'}
            width={'70%'}
            fontFamily={'Inter'}
            fontWeight={'bold'}
            color={useColorModeValue('gray.500', 'gray.400')}>
           Discover why photographers choose PhotoHub to achieve their creative aspirations!
          </chakra.h2>
        </Box>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={'20'}
          mt={16}
          mb={16}
          mx={'auto'}
          fontWeight={'bold'}
          fontFamily={'sans-serif'}
          fontSize={'md'}>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} index={index} {...testimonial}/>
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