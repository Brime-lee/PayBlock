import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import AboutImg from '../assets/aboutImg.svg';

export default function AboutFlex() {
  return (
    <Stack minH={'70vh'} direction={{ base: 'column', lg: 'row' }} mb={'80px'}>
      <Flex align={'center'} justify={'center'} mx={'10px'}>
        <Text fontSize={{ base: 'md', lg: '2xl' }} color={'gray.500'}>
          Employers can also add employee addresses and the respective salary
          amounts. With our app, salary payments are automated on the date
          selected by the user, making the process seamless and efficient. Say
          goodbye to manual payroll and hello to a stress-free experience. Try
          our app today and experience the future of salary payments." Our
          decentralized payroll system is built on blockchain technology,
          ensuring maximum security and transparency for all transactions. With
          our app, both employers and employees have access to real-time updates
          on salary payments, and can easily track and verify transactions.
        </Text>
      </Flex>
      <Image
        boxSize={{ base: '400px', lg: '600px' }}
        alt={'Login Image'}
        objectFit={'cover'}
        src={AboutImg}
      />
    </Stack>
  );
}
