import React from 'react';
import { Text, Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import AboutHero from '../components/AboutHero';
import AboutFlex from '../components/AboutFlex';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        <AboutHero />
        <AboutFlex />
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'}>
          Additionally, our app eliminates the need for intermediaries, reducing
          costs and increasing efficiency. Our user-friendly interface and
          intuitive design make it easy for anyone to navigate and use. Whether
          you're an employer looking to streamline your payroll process or an
          employee wanting to keep track of your salary payments, our app has
          got you covered.
        </Text>
        <br />
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'}>
          We are constantly working to improve and update our app to provide the
          best possible experience for our users. So, join us today and
          experience the future of payroll. Our app also offers a variety of
          features that cater to the specific needs of employers and employees.
        </Text>
        <br />
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'}>
          Employers can set up recurring payments, assign different pay rates
          for different employees, and even set up bonuses and other incentives.
          They can also view and manage their payroll history, and generate
          reports for their records. On the other hand, employees can view their
          salary history and transaction details, and even set up direct deposit
          to their bank accounts.
        </Text>
        <br />
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'}>
          Our app also support multiple currency, so it can be used globally,
          which means that employees and employers can use our app regardless of
          their location. But not only that, we also prioritize the data privacy
          and security, so your personal and financial information is kept safe
          and secure with us. With our decentralized payroll system, you can
          have peace of mind knowing that your salary payments are handled
          efficiently, securely, and transparently. Try our app today and see
          the difference it can make in your payroll process.
        </Text>
        <br />
      </Container>
      <Footer />
    </>
  );
}
