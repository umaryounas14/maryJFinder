import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the async thunk for tracking analytics
export const trackAnalytics = createAsyncThunk(
  'analytics/trackAnalytics',
  async (trackingData, { rejectWithValue }) => {
    try {
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Make the API request with the authorization header
      const response = await fetch('https://maryjfinder.com/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the token here
        },
        body: JSON.stringify(trackingData),
      });
      console.log('response======================analytictracking',response)
      // Check if response is OK
      if (!response.ok) {
        throw new Error('Failed to track analytics');
      }

      // Parse the JSON response
      const responseData = await response.json();

      // Log the parsed response data
      console.log('Parsed Response Data-=-=-=-=-=-=-=-=-=:', responseData?.body);

      return responseData;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trackAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trackAnalytics.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(trackAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
