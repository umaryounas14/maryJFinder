import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
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
  setCreatedAt,
  setCompleteMessageClear,
  setIsAiTyping,
} from '../redux/slices/chatSlice';
import TypeWriter from 'react-native-typewriter';
import AnimatedDots from '../components/AnimatedDots';

const BASE_URL = 'https://maryjfinder.com/api/chatbot/chat';

// Import your AI avatar/image asset
import aiAvatar from '../assets/mar-j-icon.png'; // Adjust path as necessary

const ChatScreen = ({ route }) => {
  const { threadId, accessToken } = route.params || {
    threadId: null,
    accessToken: null,
  };
  const [inputText, setInputText] = useState('');
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const messages = useSelector((state) =>
    selectMessagesForThread(state, threadId)
  );
  const { created_at_cur_msg, isAiTyping } = useSelector(
    (state) => state.chat
  );
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoadingMessages(true);
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
          const processedMessages = processMessages(fetchedMessages);
          dispatch(setMessages({ threadId, messages: processedMessages }));
          await AsyncStorage.setItem(
            `currentChatMessages_${threadId}`,
            JSON.stringify(processedMessages)
          );
        } else {
          console.error('Failed to fetch messages:', response.data);
          dispatch(setError('Failed to fetch messages'));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        dispatch(setError(error.message));
      } finally {
        setIsLoadingMessages(false);
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
    setInputText('');

    dispatch(setCompleteMessageClear());
    dispatch(sendMessageSuccess({ threadId, message: userMessage }));
    dispatch(setIsAiTyping(true));
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const url = `${BASE_URL}?message=${encodeURIComponent(inputText)}`;
      const params = {};

      if (threadId) {
        params.thread_id = threadId;
      }
      dispatch(setCompleteMessageClear());
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

  const handleEventStream = (eventStream) => {
    const lines = eventStream.split('\n\n');
    let accumulatedText = '';
    const created_at = new Date().toISOString();
    dispatch(setCreatedAt(created_at));

    lines.forEach((line) => {
      const event = parseEvent(line);
      if (event && event.type === 'thread.message.delta') {
        try {
          const data = JSON.parse(event.data);
          accumulatedText = data.response + '';
          sendCompleteMessage(
            accumulatedText.trim(),
            false,
            created_at
          );
        } catch (e) {
          console.error('Error parsing delta event data:', e);
        }
      } else if (event && event.type === 'thread.message.completed') {
        setTimeout(() => {
          dispatch(setCreatedAt(''));
        }, 1000);
        accumulatedText = '';
      }
    });

    dispatch(setIsAiTyping(false));
  };

  const sendCompleteMessage = (
    messageContent,
    isMsgComplete,
    created_at
  ) => {
    if (messageContent.trim()) {
      const completeMessage = {
        role: 'ai',
        text: messageContent.trim(),
        created_at,
      };
      dispatch(
        sendMessageSuccess({
          threadId,
          message: completeMessage,
          isMsgComplete,
        })
      );
    }
  };

  const parseEvent = (input) => {
    const event = { type: '', data: '' };
    const lines = input.split('\n');
    lines.forEach((line) => {
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

  const formatMessageTime = (createdAt) => {
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
            await AsyncStorage.removeItem(
              `currentChatMessages_${threadId}`
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const processMessages = (fetchedMessages) => {
    const processedMessages = [];

    fetchedMessages.forEach((message, index) => {
      if (message.message) {
        processedMessages.push({
          role: 'user',
          text: message.message,
          created_at: message.created_at,
        });
      }
      if (message.response) {
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
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
      >
        {isLoadingMessages ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#099D63" />
          </View>
        ) : (
          <>
            {messages?.map((message, index) => (
              <View
                key={`${message.role}_${index}`}
                style={[
                  styles.messageContainer,
                  message?.role === 'user'
                    ? styles.userMessageContainer
                    : styles.aiMessageContainer,
                ]}
              >
                <View style={styles.messageContent}>
                  {message?.role === 'user' ? (
                    <>
                      <Text style={styles.messageText}>{message.text}</Text>
                      <Icon
                        name="user"
                        size={25}
                        color="white"
                        style={styles.messageIcon}
                      />
                    </>
                  ) : (
                    <>
                      {created_at_cur_msg == message?.created_at ? (
                        <TypeWriter minDelay={50} typing={2}>
                          {message?.text}
                        </TypeWriter>
                      ) : (
                        <Markdown>{message?.text}</Markdown>
                      )}
                      <Image
                        source={aiAvatar}
                        style={styles.messageImage}
                      />
                    </>
                  )}
                </View>
                <Text style={styles.messageTime}>
                  {formatMessageTime(message?.created_at)}
                </Text>
              </View>
            ))}
          </>
        )}
        {isAiTyping && (
          <View style={[styles.messageContainer, styles.aiMessageContainer]}>
            <AnimatedDots />
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
    backgroundColor: '#F7F7F7',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bannerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerIcon: {
    color: 'black',
  },
  plusIcon: {
    color: 'black',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    padding: 20,
    maxWidth: '100%',
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    position: 'relative',
    marginTop: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 5,
    width: '100%',
    marginLeft: 10,
  },
  messageContent: {
    position: 'relative',
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  messageIcon: {
    position: 'absolute',
    top: -15,
    right: -35,
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: 'rgb(73, 163, 241)',
  },
  messageImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -5,
    left: -25,
    zIndex: 1,
    backgroundColor: 'black',
    borderRadius: 10,
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
    backgroundColor: '#F7F7F7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
