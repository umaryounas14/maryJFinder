import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  completeMessage: '',
  created_at_cur_msg: '',
  isAiTyping: false,
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
    setCreatedAt(state, action) {
      state.created_at_cur_msg = action.payload;
    },
    setMessages(state, action) {
      const {threadId, messages} = action.payload;
      if (!state.threads[threadId]) {
        state.threads[threadId] = [];
      }
      state.threads[threadId] = messages;
      state.loading = false;
    },
    setIsAiTyping(state, action) {
      state.isAiTyping = action.payload;
    },
    setCompleteMessageClear(state, action) {
      state.completeMessage = '';
    },
    sendMessageSuccess(state, action) {
      const {threadId, message} = action.payload;
      state.completeMessage = state?.completeMessage.concat(`${message.text} `);

      if (!state.threads[threadId]) {
        state.threads[threadId] = []; // Initialize thread if not exists
      }

      message.text = state.completeMessage;
      const index = state?.threads[threadId]?.findIndex(
        item => item?.created_at == message?.created_at,
      );
      if (index > -1) {
        state.threads[threadId][index].text = state.completeMessage;
      } else {
        state.threads[threadId].push(message); // Push message to the specified thread
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setMessages,
  sendMessageSuccess,
  setCreatedAt,
  setCompleteMessageClear,
  setIsAiTyping,
} = chatSlice.actions;

export const selectMessagesForThread = (state, threadId) =>
  state.chat.threads[threadId] || [];

export default chatSlice.reducer;