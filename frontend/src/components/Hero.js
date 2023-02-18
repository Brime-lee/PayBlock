import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Link,
  Icon,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroImg from '../assets/En.png';

export default function Hero() {
  const { isConnected } = useAccount();

  useEffect(() => {
    AOS.init({
      duration: 2000,
      // easing: 'ease-in-out-sine',
    });
  }, []);
  return (
    <Container maxW={'7xl'} style={{ minHeight: '100vh' }}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'coloumn', lg: 'row' }}
      >
        <Stack data-aos='fade-right' flex={1} spacing={{ base: 5, md: 5 }}>
          <Heading lineHeight={1.3} fontWeight={600}>
            <Text
              fontSize={{ base: '6xl', lg: '8xl' }}
              fontWeight={'600'}
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '30%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.400',
                zIndex: -1,
              }}
            >
              Pay Block,
            </Text>
            <br />
            <Text
              as={'span'}
              color={'green.400'}
              style={{ fontSize: '42px', fontWeight: '600' }}
            >
              <Typewriter
                options={{
                  strings: [
                    'Easy Disbursment',
                    'Decentralized Authority',
                    'Faultless System',
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Text>
          </Heading>
          <Text
            color={'gray.500'}
            fontSize={{ base: 'xl', sm: '2xl', lg: '2.5xl' }}
            fontWeight={'600'}
          >
            Enjoy stable and decentralized crypto based system, for the
            disbursement of staff salaries.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Link
              href={isConnected ? '/userHome' : '/signup'}
              style={{ textDecoration: 'none' }}
            >
              <Button
                rounded={'full'}
                fontWeight={'700'}
                size={'lg'}
                px={6}
                colorScheme={'green'}
                bg={'green.400'}
                _hover={{ bg: 'green.500' }}
              >
                Get started
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Blob
            w={'100%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={useColorModeValue('green.100', 'green.400')}
          />
          <Box
            position={'relative'}
            rounded={'2xl'}
            width={'full'}
            overflow={'hidden'}
            data-aos='flip-left'
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={HeroImg}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox='0 0 578 440'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z'
        fill='currentColor'
      />
    </Icon>
  );
};
