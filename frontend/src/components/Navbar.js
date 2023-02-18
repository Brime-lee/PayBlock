import {
  Box,
  Flex,
  Link,
  Button,
  Stack,
  Image,
  useColorMode,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Logo from '../assets/payBlockLogo.png';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box>
        <Container maxW={'7xl'}>
          <Flex
            style={{ height: useBreakpointValue({ base: '10vh', md: '14vh' }) }}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box
              style={{
                width: useBreakpointValue({ base: '120px', md: '160px' }),
              }}
              p={'0px 10px 10px 0px'}
            >
              <Link href='/'>
                <Image alt={'logo'} fit={'cover'} align={'center'} src={Logo} />
              </Link>
            </Box>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7} align='center'>
                <Button
                  style={{
                    display: useBreakpointValue({ base: 'none', md: 'block' }),
                  }}
                  onClick={toggleColorMode}
                >
                  {colorMode === 'light' ? (
                    <MoonIcon color='blue.600' />
                  ) : (
                    <SunIcon color='orange' />
                  )}
                </Button>
                <Link
                  style={{
                    display: useBreakpointValue({ base: 'none', md: 'block' }),
                    fontWeight: 700,
                  }}
                  href='/about'
                >
                  About us
                </Link>
                {/* <Connect /> */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 12,
                  }}
                >
                  <ConnectButton />
                </div>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
