import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatScreen from '../screens/ChatScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, isLoggedIn, handleLogout, conversations, isLoading }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('Main');
  };

  const navigateToChat = (threadId) => {
    navigation.navigate('ChatScreen', { threadId }); // Pass threadId as a parameter
  };
 
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#099D63" />
      </View>
    );
  }

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View>
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.newChatContainer}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <Text style={styles.newChatText}>New Chat</Text>
          </TouchableOpacity>
        )}
        {isLoggedIn && conversations && conversations.length > 0 && (
          <ScrollView style={styles.conversationList}>
            {conversations.map((conversation) => (
              <DrawerItem
                key={conversation.id}
                label={conversation.message} // Displaying last_response instead of message
                onPress={() => navigateToChat(conversation.thread_id)}
              />
            ))}
          </ScrollView>
        )}
        <TouchableOpacity
          style={[styles.button, styles.logOutButton]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, styles.signUpButtonText]}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    </DrawerContentScrollView>
  );
};

const ChatDrawer = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get('https://maryjfinder.com/api/chatbot/conversations', {
          headers: headers,
        });

        if (response.data.status_code === 200) {
          setConversations(response.data.body.response || []);
        } else {
          console.error('Failed to fetch conversations:', response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleLogout = async () => {
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
  };

  return (
    <Drawer.Navigator
      initialRouteName="ChatScreen"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          conversations={conversations}
          isLoading={isLoading}
        />
      )}
      drawerPosition="right"
      drawerType="slide"
      drawerStyle={{ width: '70%' }}
      overlayColor="transparent"
      screenOptions={{
        swipeEnabled: true,
        gestureEnabled: true,
        headerShown: false,
        drawerHideStatusBarOnOpen: true,
        drawerIndicatorStyle: { marginRight: 0 },
        drawerStyle: { width: '70%' },
      }}
    >
      {/* Define your drawer screens here */}
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 60, // Space at the bottom for buttons
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
    color: 'black',
    marginLeft: 10,
  },
  conversationList: {
    maxHeight: '85%', // Adjust the maximum height of conversation list as needed
    marginTop: 10,
  },
  button: {
    backgroundColor: '#20B340',
    paddingVertical: 20,
    paddingHorizontal: 90,
    borderRadius: 10,
    marginBottom: 10, // Add margin between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: 'white',
    borderColor: '#20B340',
    borderWidth: 1,
  },
  logOutButton: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    marginHorizontal: 6,
    marginVertical: 70
  },
  signUpButtonText: {
    color: 'black',
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
