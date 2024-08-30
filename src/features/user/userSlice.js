import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};


export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be have different or more from logged-in user infomation 
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectUserOrders = (state)=> state.user.userOrders;
export default userSlice.reducer;
