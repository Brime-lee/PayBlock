import React, { useState, useEffect } from 'react';
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
// import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import Wallet from '../assets/wallet-icon.png';

export default function Connect() {
  const display = useBreakpointValue({ base: 'none', md: 'block' });
  const mobileDisplay = useBreakpointValue({ base: 'block', md: 'none' });
  const connectedButtonBg = useColorModeValue('green.100', '');
  const connectedButtonBgHover = useColorModeValue('green.700', 'green.300');
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [balance, setBalance] = useState(null);

  // useEffect(() => {
  //   // Connect to the Ethereum network using Ethers.js
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   // Get the current account address
  //   provider.listAccounts().then(([address]) => {
  //     // Get the account balance
  //     provider.getBalance(address).then((balance) => {
  //       // Convert the balance to ETH and format it to 2 decimal places
  //       const balanceInEth = ethers.utils.formatEther(balance);
  //       const formattedBalance = parseFloat(balanceInEth).toFixed(2);

  //       // Update the state with the formatted balance
  //       setBalance(formattedBalance);
  //     });
  //   });
  // }, []);

  return (
    <>
      {isConnected ? (
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
              <span style={{ marginRight: '20px' }}>{balance} MATIC</span>
              {address.slice(0, 6)}.......
              {address.slice(address.length - 4, address.length)}
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
                  onClick={() => disconnect()}
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
          onClick={() => connect()}
        >
          Connect wallet
        </Button>
      )}
      {isConnected ? (
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
              {address?.slice(0, 6)}.......
              {address?.slice(address.length - 4, address.length)}
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
                  onClick={() => disconnect()}
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
          <Link onClick={() => connect()}>
            <Image alt={'logo'} fit={'cover'} align={'center'} src={Wallet} />
          </Link>
        </Box>
      )}
    </>
  );
}
