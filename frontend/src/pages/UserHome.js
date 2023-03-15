import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Flex } from '@chakra-ui/react';
import SideNav from '../components/SideNav';
import Background from '../assets/payrolll3.webp';
import { Box } from '@chakra-ui/react';

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
