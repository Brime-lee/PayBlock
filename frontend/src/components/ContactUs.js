import React, { useEffect } from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useToast,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import AOS from 'aos';

import Ibrahim from '../assets/Brimelee.jpeg';
import Faruq from '../assets/Faruq.jpeg';
import Mufliha from '../assets/Mufliha.jpeg';
import Akeem from '../assets/Akeem.jpeg';
import Qaweey from '../assets/Qaweey.jpeg';

const developers = [
  {
    name: 'Ibrahim Ismail',
    url: Ibrahim,
  },
  {
    name: 'Faruq Dauda',
    url: Faruq,
  },
  {
    name: 'AbdulMajid Mufliha',
    url: Mufliha,
  },
  {
    name: 'AbdulHakeem Bolarinwa',
    url: Akeem,
  },
  {
    name: 'Qaweey Soetan',
    url: Qaweey,
  },
];

export default function JoinOurTeam() {
  const toast = useToast();
  const size = useBreakpointValue({ base: 'md', lg: 'xl' });

  useEffect(() => {
    AOS.init({
      duration: 2000,
      // easing: 'ease-in-out-sine',
    });
  }, []);

  const successToast = () =>
    toast({
      title: 'Request sent',
      description: 'Thank you for contacting',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack
          align={'center'}
          justify={'center'}
          spacing={{ base: 10, md: 20 }}
          px={'20px'}
        >
          <Text
            lineHeight={1.1}
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '3xl' }}
            fontFamily={'cursive'}
            data-aos='fade-right'
          >
            Meet the team behind the Product, a group of dedicated and
            passionate individuals working together to bring you the best
            products and services.
          </Text>
          <Stack
            data-aos='zoom-out'
            direction={'row'}
            spacing={4}
            align={'center'}
          >
            <AvatarGroup>
              {developers.map((developer) => (
                <Avatar
                  key={developer.name}
                  name={developer.name}
                  src={developer.url}
                  // size='xl'
                  size={size}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.08)',
                    bgGradient: 'linear(to-bl, green.400,green.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          data-aos='fade-left'
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              textAlign={'center'}
            >
              Book for a Demo
            </Heading>
            <Text
              color={'gray.500'}
              fontSize={{ base: 'sm', sm: 'lg' }}
              textAlign={'center'}
            >
              Our team is always available to speak with you and provide the
              information you need
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder='Firstname Lastname'
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder='email'
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder='Phone number'
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              rounded={'full'}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient='linear(to-r, green.400,green.400)'
              color={'white'}
              onClick={successToast}
              _hover={{
                bgGradient: 'linear(to-r, green.400,green.400)',
                boxShadow: 'xl',
              }}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(120px)' }}
      />
      <Blur
        position={'absolute'}
        bottom={-200}
        right={0}
        style={{ filter: 'blur(180px)' }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '28vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height='400px'
      viewBox='0 0 528 560'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#F9A51A' />
          <stop offset='100%' stopColor='#48BB78' />
        </linearGradient>
      </defs>
      <circle cx='71' cy='61' r='111' fill='url(#gradient)' />
      <circle cx='244' cy='106' r='139' fill='url(#gradient)' />
      <circle cy='291' r='139' fill='url(#gradient)' />
      <circle cx='80.5' cy='189.5' r='101.5' fill='url(#gradient)' />
      <circle cx='196.5' cy='317.5' r='101.5' fill='url(#gradient)' />
      <circle cx='70.5' cy='458.5' r='101.5' fill='url(#gradient)' />
      <circle cx='426.5' cy='-0.5' r='101.5' fill='url(#gradient)' />
    </Icon>
  );
};
