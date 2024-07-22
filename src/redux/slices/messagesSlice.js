// messagesSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messagesByThread: {}, // Object to store messages by thread ID
  loading: false,
  error: null,
};

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOThmN2E0YjJjYmE1ZTQ5ZThmMDU0MWY5NGE5NDRjYTA2NjM3NjU1OTZlYzVkNWU5ZjYzMzUzZGIxMWJmYTc3ODE2ZGJjYTA5OGU0MTVhOWEiLCJpYXQiOjE3MjAxOTAyNTguOTAzMDg0LCJuYmYiOjE3MjAxOTAyNTguOTAzMDg2LCJleHAiOjE3MjA2MjIyNTguOTAxMDk5LCJzdWIiOiI3NSIsInNjb3BlcyI6W119.UwL1DDM31Hkr52Ocyw24oEsdJEFKSCGL_l3AtyJzvJHgpp4C_Y29VOFDQVaTIq0Xof6Cr2xaxwyZhfjmly-x5tPUYoLWxW_g-bJonw1q8tIDXwqgWpi6BvTF_tGKeY8q7KpJ1RyVZGw_E4wf1AOJvtvAe6wVF_HEh_KrlBttzrKhF6-wIlvSXOslVP-vnodyfb9QFSG4P26IfpJGmz-ApjxTneb90dfFj-HLl9U3L_Jc79o0jx0A9uTghUk7zqUqFOV0j__UOI8VjrmPpumE_2U04iytMiKv_DoYfbCIQtRcuasuO2WdgWkQnSlCRWetSlXdefdcDFjn2Os6WzssjyEtehS7CRlMfPfK6fXaIi4lCPMjdpn-CQT0UQpLIB5LsM3ztNbt1QthLzvvKJbgE-WORWpLXuxVwDBPSG1t4mcdppf2ot-r_2UqtiZQK6n9mmwgxdEfhKn1umJuWoYE-hn4LW1tAvaAS6xStqAE1xDycDZj_AymN6x440NDgiMoEfbXitNDeW4lcSeMpDa1GpdlLGNXVUrYk9vZCGZ-pTUGcMsf18QukbPpKN4egi0fBiyb8C95wkL0Js1tBTXVyWUKHmvXsArX5GKFQdQSYyS8clHOtDPxsabHBQ3oeCcOy7JQxkMQQvXJdxiUYde1iyYp_sDPhU6myXjlsNRyjsI"

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
