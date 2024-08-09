// ChatScreen.js

import React, {useState, useEffect, useRef} from 'react';
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
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';
import {useSelector, useDispatch} from 'react-redux';
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
import aiAvatar from '../assets/mar-j-icon.png';
import centerImage from '../assets/test.png';
import {useTheme, lightTheme, darkTheme} from '../context/themeContext';

const BASE_URL = 'https://maryjfinder.com/api/chatbot/chat';

const ChatScreen = ({route}) => {
  const {theme, toggleTheme, isDarkTheme} = useTheme();
  const {threadId, accessToken} = route.params || {
    threadId: null,
    accessToken: null,
  };
  const [inputText, setInputText] = useState('');
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const messages = useSelector(state =>
    selectMessagesForThread(state, threadId),
  );
  const {created_at_cur_msg, isAiTyping} = useSelector(state => state.chat);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
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
          {headers},
        );

        if (response.data.status_code === 200) {
          const fetchedMessages = response.data.body.response || [];
          const processedMessages = processMessages(fetchedMessages);
          dispatch(setMessages({threadId, messages: processedMessages}));
          await AsyncStorage.setItem(
            `currentChatMessages_${threadId}`,
            JSON.stringify(processedMessages),
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

  const sendMessage = messageText => {
    if (!messageText.trim()) return;

    const userMessage = {
      role: 'user',
      text: messageText.trim(),
      created_at: new Date().toISOString(),
    };
    setInputText('');

    dispatch(setCompleteMessageClear());
    dispatch(sendMessageSuccess({threadId, message: userMessage}));
    dispatch(setIsAiTyping(true));

    AsyncStorage.getItem('accessToken')
      .then(accessToken => {
        const url = `${BASE_URL}?message=${encodeURIComponent(messageText)}`;
        const params = {};

        if (threadId) {
          params.thread_id = threadId;
        }
        dispatch(setCompleteMessageClear());
        return axios.get(url, {
          params,
          headers: {
            Accept: 'text/event-stream',
            Authorization: `Bearer ${accessToken}`,
          },
          adapter: 'fetch',
        });
      })
      .then(response => {
        handleEventStream(response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        dispatch(setError(error.message));
      });
  };

  const handleEventStream = eventStream => {
    const lines = eventStream.split('\n\n');
    let accumulatedText = '';
    let threadId = null;
    const created_at = new Date().toISOString();
    dispatch(setCreatedAt(created_at));

    lines.forEach(line => {
      const event = parseEvent(line);
      if (event && event.type === 'thread.message.delta') {
        try {
          const data = JSON.parse(event.data);
          accumulatedText = data.response + '';
          sendCompleteMessage(
            accumulatedText.trim(),
            false,
            created_at,
            threadId,
          );
        } catch (e) {
          console.error('Error parsing delta event data:', e);
        }
      }
      if (event && event.type === 'thread.message.completed') {
        const data = JSON.parse(event.data);
        threadId = data.thread_id; // Update threadId when completed event provides it
        setTimeout(() => {
          dispatch(setCreatedAt(''));
        }, 1000);
        accumulatedText = '';
      }
    });

    dispatch(setIsAiTyping(false));
  };

  const sendCompleteMessage = (messageContent, isMsgComplete, created_at) => {
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
        }),
      );
    }
  };

  const parseEvent = input => {
    const event = {type: '', data: ''};
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
      'New Chat',
      'Are you sure you want to start new chat?',
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
            dispatch(setMessages({threadId: null, messages: []}));
            navigation.navigate('ChatScreen');
          },
        },
      ],
      {cancelable: true},
    );
  };

  const processMessages = fetchedMessages => {
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

  const handleLinkPress = url => {
    // Check if the URL is a product URL
    const productIdMatch = url.match(/\/product\/(\d+)/);
    if (productIdMatch) {
      const productId = productIdMatch[1];
      // Navigate to the ProductScreen with the productId
      navigation.navigate('ProductScreen', {productId});
    } else {
      // Handle other URLs or open in default browser
      Linking.openURL(url);
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.banner}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon
            name="menu"
            size={28}
            style={[styles.drawerIcon, {color: theme.colors.primary}]}
          />
        </TouchableOpacity>
        <Text style={[styles.bannerText, {color: theme.colors.primary}]}>
          MaryJfinder Chat
        </Text>
        <TouchableOpacity onPress={startNewChat}>
          <Icon
            name="edit"
            size={25}
            style={[styles.plusIcon, {color: theme.colors.primary}]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        showsVerticalScrollIndicator={false}>
        {isLoadingMessages ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
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
                ]}>
                <View style={styles.messageContent}>
                  {message?.role === 'user' ? (
                    <>
                      <Text
                        style={[
                          styles.messageText,
                          {color: theme.colors.text},
                        ]}>
                        {message.text}
                      </Text>
                      <Icon
                        name="user"
                        size={25}
                        color="black"
                        style={styles.messageIcon}
                      />
                    </>
                  ) : (
                    <>
                      {created_at_cur_msg == message?.created_at ? (
                        <TypeWriter
                          minDelay={50}
                          typing={2}
                          style={{color: theme.colors.text}}>
                          {message?.text}
                        </TypeWriter>
                      ) : (
                        <Markdown
                          style={{color: theme.colors.text}}
                          onLinkPress={handleLinkPress} // Handle link press
                        >
                          {message?.text}
                        </Markdown>
                      )}
                      <Image source={aiAvatar} style={styles.messageImage} />
                    </>
                  )}
                </View>
                <Text style={[styles.messageTime, {color: theme.colors.text}]}>
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
      {messages.length === 0 && !isLoadingMessages && (
        <View style={styles.centerImageContainer}>
          <Image source={centerImage} style={styles.centerImage} />
        </View>
      )}
      {messages.length === 0 && !isLoadingMessages && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendationContainer}>
          {/* Render four separate recommendation blocks */}
          <TouchableOpacity
            style={[
              styles.recommendationBlock,
              {backgroundColor: theme.colors.secondary},
            ]}
            onPress={() => {
              sendMessage('What product do you recommend for anxiety?');
            }}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 14,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              What product do you recommend for anxiety?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.recommendationBlock,
              {backgroundColor: theme.colors.secondary},
            ]}
            onPress={() =>
              sendMessage(
                'Where is the closest dispensary near to my location?',
              )
            }>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 14,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              Where is the closest dispensary near to my location?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.recommendationBlock,
              {backgroundColor: theme.colors.secondary},
            ]}
            onPress={() =>
              sendMessage('What products are available for pain relief?')
            }>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 14,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              What products are available for pain relief?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.recommendationBlock,
              {backgroundColor: theme.colors.secondary},
            ]}
            onPress={() =>
              sendMessage('Can you recommend a dispensary near me?')
            }>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 14,
                color: theme.colors.text,
              }}>
              Can you recommend a dispensary near me?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {backgroundColor: theme.colors.secondary, color: theme.colors.text},
          ]}
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.text}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => sendMessage(inputText)}
          blurOnSubmit={false}
          editable={!isLoadingSend}
        />
        <TouchableOpacity
          style={[styles.sendButton, {backgroundColor: 'black'}]}
          onPress={() => sendMessage(inputText)}
          disabled={isLoadingSend}>
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
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 5,
    width: '100%',
    marginLeft: 10,
    backgroundColor: lightTheme.colors.secondary,
  },
  messageContent: {
    position: 'relative',
    padding: 10,
  },
  messageText: {
    fontSize: 14,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  messageIcon: {
    position: 'absolute',
    top: -15,
    right: -35,
    zIndex: 1,
    borderRadius: 10,
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
    fontSize: 10,
    marginTop: 2,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  centerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  recommendationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  recommendationBlock: {
    width: 140,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default ChatScreen;
