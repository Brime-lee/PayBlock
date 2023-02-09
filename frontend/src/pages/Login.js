import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import Logo from '../assets/payBlockLogo.png';
import LoginImg from '../assets/LoginImg.jpg';

export default function Login() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Box align={'center'} mb={10}>
            <Link href='/'>
              <Image
                alt={'logo'}
                fit={'cover'}
                align={'center'}
                h={'80px'}
                src={Logo}
              />
            </Link>
          </Box>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox colorScheme={'green'}>Remember me</Checkbox>
              <Link color={'green.500'}>Forgot password?</Link>
            </Stack>
            <Button
              variant={'solid'}
              colorScheme={'green'}
              bg={'green.400'}
              align={'left'}
              _hover={{ bg: 'green.500' }}
            >
              Sign in
            </Button>
            <Text align={'center'}>
              Don't have an account?{' '}
              <Link href='/signup' color={'green.500'}>
                Sign up here
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={'Login Image'} objectFit={'cover'} src={LoginImg} />
      </Flex>
    </Stack>
  );
}
