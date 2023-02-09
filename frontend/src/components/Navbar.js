import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import Web3Modal from 'web3modal';
import MetaMaskLogo from '../assets/metamask.svg';
import * as UAuthWeb3Modal from '@uauth/web3modal';
import { useDispatch } from 'react-redux';
import { connect, disconnect } from '../redux/slice/web3slice';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Logo from '../assets/payBlockLogo.png';
import Connect from '../components/Connect';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [proxy, setProxy] = useState();
  const [web3Modal, setWeb3Modal] = useState(null);
  // const [userBalance, setUserBalance] = useState();
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const providerOptions = {
      //***Injected Wallet***//
      injected: {
        display: {
          logo: MetaMaskLogo,
          type: 'injected',
          check: 'isMetaMask',
          description: 'Connect to your MetaMask Wallet',
        },
        package: true,
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      // network: "maticmum",
      disableInjectedProvider: false,
      displayNoInjectedProvider: false,
      theme: {
        background: 'rgb(20,30,30, 0.65)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(40, 240, 5, 0.05)',
        hover: 'rgb(16, 45, 35, 0.9)',
      },
      providerOptions,
    });
    // Registers the web3modal so the connector has access to it.
    UAuthWeb3Modal.registerWeb3Modal(newWeb3Modal);

    setWeb3Modal(newWeb3Modal);
  }, []);

  const connectWallet = async () => {
    try {
      const web3Proxy = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Proxy);
      const accounts = await provider.listAccounts();
      const chainData = await provider.getNetwork();
      setProxy(web3Proxy);
      setProvider(provider);
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEther = ethers.utils.formatEther(balance);
      const formatedBalanceInEthers = Number(balanceInEther).toFixed(2);
      if (chainData.chainId !== 80001) {
        alert(
          'You are currently connected to an unsupported network, please switch to Polygon Mumbai Testnet'
        );
        dispatch(connect({ connected: false }));
        return;
      } else {
        // setWalletAddress(accounts[0]);
        setAccount(accounts[0]);
        // await getUserBalance();
        setChainId(chainData.chainId);
        // setConnected(true);
        dispatch(
          connect({
            account: accounts[0],
            connected: true,
            chainId: chainData.chainId,
            provider: provider,
            proxy: web3Proxy,
            accountBalance: formatedBalanceInEthers,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    // await web3Modal.clearCachedProvider();
    // refreshState();
    dispatch(
      disconnect({
        account: null,
        connected: false,
        accountBalance: null,
      })
    );
  };

  return (
    <>
      <Box
      // bg={useColorModeValue('white.200', 'gray.900')}
      // px={4}
      // boxShadow={'base'}
      >
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
                <Connect
                  connectWallet={connectWallet}
                  disconnectWallet={disconnectWallet}
                />
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
