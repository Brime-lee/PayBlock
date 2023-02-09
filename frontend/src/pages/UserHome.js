import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Flex } from '@chakra-ui/react';
import SideNav from '../components/SideNav';
import Background from '../assets/payrolll3.webp';
import { Box } from '@chakra-ui/react';

// const contractAddress = '0xEc325493ee32B851ac47EdC0d0BBB6efA68BfB89';

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
