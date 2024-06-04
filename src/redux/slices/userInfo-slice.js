import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, getUserInfo } from '../../constants/endpoints';

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token from AsyncStorage:', error);
    throw error;
  }
};

export const userInfo = createAsyncThunk(
  'userInfo',
  async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios({
        method: 'get',
        url: BASE_URL + getUserInfo,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response?.data;
    } catch (error) {
      console.error('User Info Error:', error);
      throw error; 
    }
  },
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userInfoSlice.reducer;
