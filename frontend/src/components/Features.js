import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import AOS from 'aos';

import Disburment from '../assets/disbursment.jpg';
import Decentralization from '../assets/decentralization.jpg';
import Faultless from '../assets/faultless.jpg';

const Features = ({ children }) => {
  return <Box data-aos='zoom-in'>{children}</Box>;
};

const FeaturesContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const FeaturesHeading = ({ children }) => {
  return (
    <Heading as={'h3'} fontSize={'2xl'} color={'green.400'}>
      {children}
    </Heading>
  );
};

const FeaturesText = ({ children }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'lg'}
    >
      {children}
    </Text>
  );
};

const FeaturesAvatar = ({ src, name, title }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} size={'xl'} />
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      // easing: 'ease-in-out-sine',
    });
  }, []);
  return (
    <Box data-aos='fade-up' bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading fontSize={{ base: '4xl', lg: '6xl' }} marginBottom={'10px'}>
            Pay Block Features
          </Heading>
          <Text textAlign={'center'} fontSize={{ base: '2xl', lg: '4xl' }}>
            Free yourself from hassles of manually operated payroll system
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Features>
            <FeaturesContent>
              <FeaturesHeading>Easy Disbursment</FeaturesHeading>
              <FeaturesText>
                Streamline your financial management with our easy disbursement
                solution, designed to save you time and hassle.
              </FeaturesText>
            </FeaturesContent>
            <FeaturesAvatar src={Disburment} />
          </Features>
          <Features>
            <FeaturesContent>
              <FeaturesHeading>Decentralized Authority</FeaturesHeading>
              <FeaturesText>
                Eliminate the need for traditional intermediaries, creating a
                more secure and efficient financial ecosystem
              </FeaturesText>
            </FeaturesContent>
            <FeaturesAvatar src={Decentralization} />
          </Features>
          <Features>
            <FeaturesContent>
              <FeaturesHeading>Faultless System</FeaturesHeading>
              <FeaturesText>
                Can withstand any unforeseen circumstances and continue to
                provide seamless service.
              </FeaturesText>
            </FeaturesContent>
            <FeaturesAvatar src={Faultless} />
          </Features>
        </Stack>
      </Container>
    </Box>
  );
}
