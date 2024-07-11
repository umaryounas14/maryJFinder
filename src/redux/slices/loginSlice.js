import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, login, signUp } from '../../constants/endpoints';

const initialState = {
  loading: false,
  error: null,
  accessToken: null,
  user: null,
  message: ""
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (payload, { dispatch }) => {
    try {
      const response = await axios({
        method: 'post',
        url: BASE_URL + login,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          grant_type: payload?.grant_type,
          client_id: payload?.client_id,
          client_secret: payload.client_secret,
          username: payload.username,
          password: payload.password,
          scope: payload.scope,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          throw error.response.data; 
        } else {

          console.error('Login Error:', error);
          throw error; 
        }
      }
    }
  },
);

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload?.message;
      });
  },
});

export default loginSlice.reducer;
