
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setError,
  setMessages,
  sendMessageSuccess,
  selectMessagesForThread,
} from '../redux/slices/chatSlice';

const BASE_URL = 'https://maryjfinder.com/api/chatbot/chat';

const ChatScreen = ({ route }) => {
  const { threadId } = route.params || { threadId: null };
  const [inputText, setInputText] = useState('');
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const messages = useSelector(state => selectMessagesForThread(state, threadId));

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        dispatch(setLoading());
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `https://maryjfinder.com/api/chatbot/messages/${threadId}`,
          { headers }
        );

        if (response.data.status_code === 200) {
          const fetchedMessages = response.data.body.response || [];
          console.log(fetchedMessages, "new")
          const processedMessages = processMessages(fetchedMessages);
          dispatch(setMessages({ threadId, messages: processedMessages }));
          await AsyncStorage.setItem(`currentChatMessages_${threadId}`, JSON.stringify(processedMessages));
        } else {
          console.error('Failed to fetch messages:', response.data);
          dispatch(setError('Failed to fetch messages'));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        dispatch(setError(error.message));
      }
    };

    if (threadId) {
      fetchMessages();
    }
  }, [dispatch, threadId]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = {
      role: 'user',
      text: inputText.trim(),
      created_at: new Date().toISOString(),
    };

    dispatch(sendMessageSuccess({ threadId, message: userMessage }));
    setInputText('');
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const url = `${BASE_URL}?message=${encodeURIComponent(inputText)}`;
      const params = {};
      
      if (threadId) {
        params.thread_id = threadId;
      }

      const { data } = await axios.get(url, {
        params,
        headers: {
          Accept: 'text/event-stream',
          Authorization: `Bearer ${accessToken}`,
        },
        adapter: 'fetch',
      });

      handleEventStream(data);
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(setError(error.message));
    }
  };

  const handleEventStream = eventStream => {
    setIsAiTyping(true);
    const lines = eventStream.split('\n\n');
    let accumulatedText = '';

    lines.forEach(line => {
      const event = parseEvent(line);
      if (event && event.type === 'thread.message.delta') {
        try {
          const data = JSON.parse(event.data);
          console.log(data.response, "data")
          accumulatedText = data.response + '';
        } catch (e) {
          console.error('Error parsing delta event data:', e);
        }
      } else if (event && event.type === 'thread.message.completed') {
        sendCompleteMessage(accumulatedText.trim());
        accumulatedText = '';
      }
    });

    setIsAiTyping(false);
  };

  const sendCompleteMessage = messageContent => {
    if (messageContent.trim()) {
      const completeMessage = {
        role: 'ai',
        text: messageContent.trim(),
        created_at: new Date().toISOString(),
      };
      dispatch(sendMessageSuccess({ threadId, message: completeMessage }));
    }
  };

  const parseEvent = input => {
    const event = { type: '', data: '' };
    const lines = input.split('\n');
    lines.forEach(line => {
      const index = line.indexOf(': ');
      if (index > 0) {
        const field = line.substring(0, index);
        const value = line.substring(index + 2);
        if (field === 'event') {
          event.type = value;
        } else if (field === 'data') {
          event.data += value + '\n';
        }
      }
    });
    if (event.data) {
      event.data = event.data.trim();
    }
    return event;
  };

  const formatMessageTime = createdAt => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const startNewChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            dispatch(setLoading());
            await AsyncStorage.removeItem(`currentChatMessages_${threadId}`);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const processMessages = fetchedMessages => {
    const processedMessages = [];
  
    fetchedMessages.forEach((message, index) => {
      if (message.message) {
        // User message
        processedMessages.push({
          role: 'user',
          text: message.message,
          created_at: message.created_at,
        });
      }  if (message.response) {
        // AI response corresponding to the last user message
        processedMessages.push({
          role: 'ai',
          text: message.response,
          created_at: message.updated_at,
        });
      }
    });
  
    return processedMessages;
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" size={30} style={styles.drawerIcon} />
        </TouchableOpacity>
        <Text style={styles.bannerText}>MaryJfinder Chat</Text>
        <TouchableOpacity onPress={startNewChat}>
          <Icon name="plus" size={30} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View
            key={`${message.role}_${index}`}
            style={[
              styles.messageContainer,
              message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer,
            ]}
          >
            {message.role === 'user' ? (
              <Text style={styles.messageText}>{message.text}</Text>
            ) : (
              <Markdown>{message.text}</Markdown>
            )}
            <Text style={styles.messageTime}>{formatMessageTime(message.created_at)}</Text>
          </View>
        ))}
        {isAiTyping && (
          <View style={[styles.messageContainer, styles.aiMessageContainer]}>
            <ActivityIndicator size="small" color="#099D63" />
            <Text style={styles.messageTime}>Typing...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
          editable={!isLoadingSend}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={isLoadingSend}
        >
          {isLoadingSend ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Icon name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#099D63',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bannerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerIcon: {
    color: '#fff',
  },
  plusIcon: {
    color: '#fff',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#099D63',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#099D63',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;