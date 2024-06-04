import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, signUp } from '../../constants/endpoints';
const initialState = {
    loading: false,
    error: null,
    user: null,

};

export const signUpUser = createAsyncThunk(
  'signUpUser',
  async (payload, {dispatch}) => {
    const response = await axios({
      method: 'post',
      url: BASE_URL + signUp,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: payload?.email,
        password: payload?.password,
        terms: true
      },
    });
    return response?.data;
  },
);


export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signUpSlice.reducer;