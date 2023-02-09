import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import web3Reducer from '../slice/web3slice';
import employeeDataReducer from '../slice/employeeDataSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  web3: web3Reducer,
  employeeData: employeeDataReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
