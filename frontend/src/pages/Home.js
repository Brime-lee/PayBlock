import React from 'react';
import { Flex } from '@chakra-ui/react';

import ContactUs from '../components/ContactUs';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <Flex direction={'column'}>
      <Navbar />
      <Hero />
      <Features />
      <ContactUs />
      <Footer />
    </Flex>
  );
}
