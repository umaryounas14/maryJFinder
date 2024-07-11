import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, signUp} from '../../constants/endpoints';
import {Alert} from 'react-native';

const initialState = {
  loading: false,
  error: null,
  user: null,
  message: '',
};

export const signUpUser = createAsyncThunk(
  'signUpUser',
  async (payload, {dispatch}) => {
    try {
      const response = await axios({
        method: 'post',
        url: BASE_URL + signUp,
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
          terms: payload.terms,
          email: payload.email,
        },
      });
      return response?.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          Alert.alert(
            'SignUp Error:',
            error.response.data.body.errors.email[0],
          );
          throw error.response.data; // Throw the error response data to be caught by the component
        } else {
          // Handle other errors
          console.error('SignUp Error:', error);
          throw error; // Rethrow other errors to be caught by the component
        }
      } else {
        // Handle network errors
        throw error; // Rethrow network errors to be caught by the component
      }
    }
  },
);

export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.status === 400) {
          state.error = action.payload.data.body.errors.email[0];
          state.message = action.payload.data.body.errors.email[0];
        } else {
          state.error = action.payload;
          state.message = '';
        }
      });
  },
});

export default signUpSlice.reducer;
