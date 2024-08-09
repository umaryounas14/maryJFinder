// messagesSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messagesByThread: {}, // Object to store messages by thread ID
  loading: false,
  error: null,
};

// Assuming you have headers you want to pass
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  // Add any other headers as needed
};

export const fetchMessagesForThread = createAsyncThunk(
  'messages/fetchMessagesForThread',
  async (threadId) => {
    try {
      const response = await axios.get(`https://maryjfinder.com/api/chatbot/messages/${threadId}`,{
        headers: headers,  // Pass headers to the axios config object
      });
      return response.data.body.response; // Assuming the API returns an array of messages
    } catch (error) {
      throw Error('Failed to fetch messages');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesForThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesForThread.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesByThread[action.meta.arg] = action.payload; // Store messages in the messagesByThread object by thread ID
      })
      .addCase(fetchMessagesForThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectMessagesByThreadId = (state, threadId) => state.messages.messagesByThread[threadId];
export const selectMessageLoading = (state) => state.messages.loading;
export const selectMessageError = (state) => state.messages.error;

export default messagesSlice.reducer;
