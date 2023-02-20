import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    account: null,
    connected: false,
    accountBalance: null,
  },
  reducers: {
    connect: (state, action) => {
      state.account = action.payload.account;
      state.accountBalance = action.payload.accountBalance;
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
