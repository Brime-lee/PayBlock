import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Flex } from '@chakra-ui/react';
import SideNav from '../components/SideNav';
import Background from '../assets/payrolll3.webp';
import { Box } from '@chakra-ui/react';

// const contractAddress = '0x1dA8BF6F4FD087bC6Fa27b645462E8dB3BE3FfD2';

export default function UserHome() {
  return (
    <Container maxW={'7xl'}>
      <Box
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
          backgroundBlendMode: 'overlay',
          backgroundAttachment: 'fixed',
        }}
      >
        <Flex direction={'column'}>
          <Navbar />
          <SideNav />
          <div className='User-home'></div>
        </Flex>
      </Box>
    </Container>
  );
}
