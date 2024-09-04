import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatScreen from '../screens/ChatScreen';
import { ThemeProvider , useTheme, lightTheme, darkTheme} from '../context/themeContext';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = ({
  navigation,
  isLoggedIn,
  handleLogout,
  conversations,
  fetchConversations,
  isLoadingConversations,
  isLoadingMore,
  fetchMoreConversations,
}) => {
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  const navigateToChat = (threadId) => {
    navigation.navigate('ChatScreen', { threadId });
  };
  const handleSignUp = () => {
    navigation.navigate('Main');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Loader for initial conversations fetch
  if (isLoadingConversations && conversations.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#099D63" />
      </View>
    );
  }

  return (
    <View style={[styles.drawerContent, { backgroundColor: theme.colors.background }]}>
      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.newChatContainer}
          onPress={() => navigation.navigate('ChatScreen')}
        >
          <Text style={[styles.newChatText, { color: theme.colors.text }]}>New Chat</Text>
        </TouchableOpacity>
      )}
      {isLoggedIn && (
        <>
          {conversations.length === 0 && (
            <TouchableOpacity
              style={styles.newChatContainer}
              onPress={() => navigation.navigate('ChatScreen')}
            >
              <Text style={[styles.newChatText, { color: theme.colors.text }]}>Start New Chat</Text>
            </TouchableOpacity>
          )}
          {conversations.length > 0 && (
            <FlatList
              data={conversations}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <DrawerItem
                  key={item.id}
                  label={item.message}
                  onPress={() => navigateToChat(item.thread_id)}
                  style={{ backgroundColor: theme.colors.card }}
                  labelStyle={{ color: theme.colors.text }}
                />
              )}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMoreConversations} // Only trigger fetchMoreConversations on end reached
              style={styles.conversationList}
              ListFooterComponent={
                isLoadingMore && <ActivityIndicator size="small" color="#099D63" />
              }
            />
          )}
        </>
      )}
      <TouchableOpacity
        style={[styles.button, styles.logOutButton]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, styles.signUpButtonText]}>Logout</Text>
      </TouchableOpacity>
      {!isLoggedIn && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleLogin}
          >
            <Text style={[styles.signUpButtonText]}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toggle Theme Button */}
      <TouchableOpacity
        style={[styles.colorButton, { backgroundColor: isDarkTheme ? 'black' : '#1f1f1f', borderColor: isDarkTheme ? '#20B340' : '#ffffff' }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: isDarkTheme ? '#20B340' : '#ffffff' }]}>
          {isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ChatDrawer = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const currentPageRef = useRef(1); 
  const totalPages = 22; // Example, should be fetched from API

  const fetchConversations = useCallback(async () => {
    try {
      setIsLoadingConversations(true); // Start loading initial conversations
      const accessToken = await AsyncStorage.getItem('accessToken');
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get('https://maryjfinder.com/api/chatbot/conversations', {
        headers: headers,
        params: { page: currentPageRef.current }
      });
      console.log('response--------------------======================',response?.data?.body)
      if (response.data.status_code === 200) {
        setConversations(response.data.body.response); // Set initial conversations
        currentPageRef.current += 1; // Update currentPage using ref
      } else {
        console.error('Failed to fetch conversations:', response.data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoadingConversations(false); // Stop loading initial conversations
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

 


  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Selection' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, [navigation]);

  
  const fetchMoreConversations = useCallback(async () => {
    try {
      if (!isLoadingMore && currentPageRef.current <= totalPages) {
        setIsLoadingMore(true); // Start loading more conversations
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get('https://maryjfinder.com/api/chatbot/conversations', {
          headers: headers,
          params: { page: currentPageRef.current }
        });

        if (response.data.status_code === 200) {
          setConversations((prevConversations) => [...prevConversations, ...response.data.body.response]);
          currentPageRef.current += 1; // Update currentPage using ref
        } else {
          console.error('Failed to fetch more conversations:', response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching more conversations:', error);
    } finally {
      setIsLoadingMore(false); // Stop loading more conversations
    }
  }, [isLoadingMore, totalPages]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <ThemeProvider>
      <Drawer.Navigator
        initialRouteName="ChatScreen"
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            conversations={conversations}
            fetchConversations={fetchConversations}
            isLoadingConversations={isLoadingConversations}
            isLoadingMore={isLoadingMore}
            fetchMoreConversations={fetchMoreConversations}
          />
        )}
        screenOptions={{
          animationEnabled: true,
          swipeEnabled: true,
          gestureEnabled: true,
          headerShown: false,
          drawerIndicatorStyle: { marginRight: 0 },
          drawerStyle: { width: '65%' },
          overlayColor: 'transparent',
          drawerType: "slide",
          drawerAnimation: 'slide', // Explicitly set drawer animation type
        }}
      >
        <Drawer.Screen name="ChatScreen" component={ChatScreen} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  newChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  newChatText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  conversationList: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  colorButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
  },
  signUpButton: {
    borderColor: '#20B340',
    borderWidth: 1,
  },
  logOutButton: {
    backgroundColor: '#429e5a',
    borderColor: '#429e5a',
    borderWidth: 1,
    marginHorizontal: 2,
    marginVertical: 2,
    marginBottom: 5
  },
  signUpButtonText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtons: {
    alignItems: 'center',
  },
});

export default ChatDrawer;