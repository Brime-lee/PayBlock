import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    account: null,
    connected: false,
    accountBalance: null,
    // proxy: null,
    // provider: null,
    // chainId: null,
  },
  reducers: {
    connect: (state, action) => {
      state.account = action.payload.account;
      state.accountBalance = action.payload.accountBalance;
      // state.proxy = action.payload.proxy;
      // state.provider = action.payload.provider;
      // state.chainId = action.payload.chainId;
      state.connected = true;
    },
    disconnect: (state) => {
      state.account = null;
      state.connected = false;
      state.accountBalance = null;
    },
  },
});

export const { connect, disconnect } = web3Slice.actions;

export default web3Slice.reducer;
