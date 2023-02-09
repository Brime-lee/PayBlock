import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const employeeDataSlice = createSlice({
  name: 'employeeData',
  initialState,
  reducers: {
    addEmployeeData: (state, action) => {
      state.push(action.payload);
    },
    deleteEmployeeData: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addEmployeeData, deleteEmployeeData } =
  employeeDataSlice.actions;

export default employeeDataSlice.reducer;
