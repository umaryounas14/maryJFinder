import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, signUpBusiness } from '../../constants/endpoints';
const initialState = {
    loading: false,
    error: null,
    user: null,

};

export const businessSignUp = createAsyncThunk(
  'businessSignUp',
  async (payload, {dispatch}) => {
    try {
    const response = await axios({
      method: 'post',
      url: BASE_URL + signUpBusiness,
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
        account_type: payload.account_type
      },
    });
    return response?.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 401) {
        Alert.alert('SignUp Error:', error.response.data.body.errors.email[0])
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

export const BusinessSignUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(businessSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(businessSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(businessSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default BusinessSignUpSlice.reducer;