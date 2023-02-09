import React from 'react';
import {
  Box,
  Button,
  Link,
  Image,
  useBreakpointValue,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Popover,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Wallet from '../assets/wallet-icon.png';

export default function Connect({ connectWallet, disconnectWallet }) {
  const web3 = useSelector((state) => state.web3);
  const display = useBreakpointValue({ base: 'none', md: 'block' });
  const mobileDisplay = useBreakpointValue({ base: 'block', md: 'none' });
  const connectedButtonBg = useColorModeValue('green.100', '');
  const connectedButtonBgHover = useColorModeValue('green.700', 'green.300');

  return (
    <>
      {web3.connected ? (
        <Popover>
          <PopoverTrigger>
            <Button
              variant='outline'
              style={{
                display: display,
              }}
              rounded={'full'}
              fontWeight={'700'}
              mt={4}
              colorScheme={'green'}
              bg={connectedButtonBg}
              align={'left'}
              _hover={{ color: connectedButtonBgHover }}
            >
              <span style={{ marginRight: '20px' }}>
                {web3?.accountBalance} MATIC
              </span>
              {web3?.account?.slice(0, 6)}.......
              {web3?.account?.slice(
                web3?.account.length - 4,
                web3?.account.length
              )}
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                This action will disconnect your wallet
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  onClick={disconnectWallet}
                  variant='outline'
                  colorScheme='red'
                  _hover={{ bg: 'red.400', color: 'white' }}
                >
                  Disconnect wallet
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <Button
          style={{
            display: display,
          }}
          rounded={'full'}
          fontWeight={'700'}
          mt={4}
          variant={'solid'}
          colorScheme={'green'}
          bg={'green.400'}
          align={'left'}
          _hover={{ bg: 'green.500' }}
          onClick={connectWallet}
        >
          Connect wallet
        </Button>
      )}
      {web3.connected ? (
        <Popover>
          <PopoverTrigger>
            <Button
              variant='outline'
              style={{
                display: mobileDisplay,
              }}
              rounded={'full'}
              fontWeight={'700'}
              mt={4}
              colorScheme={'green'}
              // bg={'green.400'}
              align={'left'}
              _hover={{ color: 'green.400' }}
            >
              {/* <span style={{ marginRight: '20px' }}>
                {web3?.accountBalance} MATIC
              </span> */}
              {web3?.account?.slice(0, 6)}.......
              {web3?.account?.slice(
                web3?.account.length - 4,
                web3?.account.length
              )}
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                Are you sure you want to disconnect your wallet
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  onClick={disconnectWallet}
                  variant='outline'
                  colorScheme='red'
                  _hover={{ bg: 'red.400', color: 'white' }}
                >
                  Disconnect wallet
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <Box
          w={'50px'}
          h={'50px'}
          style={{
            display: mobileDisplay,
          }}
        >
          <Link onClick={connectWallet}>
            <Image alt={'logo'} fit={'cover'} align={'center'} src={Wallet} />
          </Link>
        </Box>
      )}
    </>
  );
}
