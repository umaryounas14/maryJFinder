import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, getAllStores } from '../../constants/endpoints';

// Utility function to get access token
const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token from AsyncStorage:', error);
    throw error;
  }
};

// Async thunk to fetch stores
export const getStores = createAsyncThunk(
  'stores/getStores',
  async ({ page = 1, limit = 5 } = {}) => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}${getAllStores}?page=${page}&limit=${limit}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return {
        data: response.data.body.response,
        totalPages: response.data.body.totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error('Stores Error:', error);
      throw error;
    }
  },
);

// Slice definition
export const getAllStoresSlice = createSlice({
  name: 'stores',
  initialState: {
    data: [],
    totalPages: 1,
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStores.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.currentPage === 1) {
          state.data = action.payload.data; // Replace data if on the first page
        } else {
          state.data = [...state.data, ...action.payload.data]; // Append data if not on the first page
        }
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default getAllStoresSlice.reducer;
