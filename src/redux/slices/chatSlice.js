
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  threads: {}, // Store threads by threadId
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setMessages(state, action) {
      const { threadId, messages } = action.payload;
      if (!state.threads[threadId]) {
        state.threads[threadId] = [];
      }
      state.threads[threadId] = messages;
      state.loading = false;
    },
    sendMessageSuccess(state, action) {
      const { threadId, message } = action.payload;
      if (!state.threads[threadId]) {
        state.threads[threadId] = []; // Initialize thread if not exists
      }
      state.threads[threadId].push(message); // Push message to the specified thread
    },
  },
});

export const { setLoading, setError, setMessages, sendMessageSuccess } = chatSlice.actions;

export const selectMessagesForThread = (state, threadId) => state.chat.threads[threadId] || [];

export default chatSlice.reducer;