import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store/store';
import { useColorModeValue } from '@chakra-ui/react';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';
import ProtectedRoutes from './components/ProtectedRoutes';

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: '82qowNhkJBoR8Qt2x-EdvSvPZWTRqW_8' }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            modalSize='compact'
            appInfo={{
              appName: 'PayBlock',
            }}
            theme={lightTheme({
              accentColor: '#48bb78',
              accentColorForeground: '#1A202C',
              borderRadius: 'large',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/about' element={<About />} />
                <Route path='/' element={<ProtectedRoutes />}>
                  <Route path='/UserHome' element={<UserHome />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
