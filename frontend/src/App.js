import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store/store';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';
import ProtectedRoutes from './components/ProtectedRoutes';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WagmiConfig client={client}>
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
        </WagmiConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
