import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    sumAmount: 0,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setSumAmount(state, action) {
      state.sumAmount = action.payload;
    },
  },
});

export const { setData, setSumAmount } = employeeSlice.actions;

export default employeeSlice.reducer;
