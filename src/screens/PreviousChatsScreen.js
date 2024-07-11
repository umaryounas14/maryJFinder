import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

const PreviousChatsScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPreviousChats = async () => {
      setIsLoading(true);
      try {
        const storedPreviousChats = await AsyncStorage.getItem(
          'currentChatMessages',
        );
        if (storedPreviousChats) {
          setMessages(JSON.parse(storedPreviousChats));
        }
      } catch (error) {
        console.error('Error loading previous chats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPreviousChats();
  }, []);

  const formatMessageTime = createdAt => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}>
        {messages.map(message => (
          <View
            key={message._id}
            style={[
              styles.messageContainer,
              message.user._id === 'user'
                ? styles.userMessage
                : styles.aiMessage,
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>
              {formatMessageTime(message.createdAt)}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#999" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#099D63',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'black',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
  },
  messageTime: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default PreviousChatsScreen;
