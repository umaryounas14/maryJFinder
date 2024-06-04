import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import SplashScreen from './src/components/splashscreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Login from './src/screens/LoginScreen';
import Verification from './src/screens/VerificationScreen';
import About from './src/screens/AboutYou';
import AboutBusiness from './src/screens/AboutBusiness';
import UpgradePlan from './src/screens/UpgradePlanScreen';
import AddBusiness from './src/screens/AddBusiness';
import Dashboard from './src/screens/Dashboard';
import ActivateStore from './src/screens/ActiveStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({navigation}) => {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');

  const handleScreenPress = screenName => {
    setSelectedScreen(screenName);
    navigation.navigate(screenName);
  };

  const getScreenItemStyle = screenName => {
    return selectedScreen === screenName ? styles.selectedItem : styles.item;
  };



  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./src/assets/splash.png')}
          style={styles.image}
        />
      </View>

      {/* Drawer Items */}
      <DrawerItem
        label="Dashboard"
        onPress={() => handleScreenPress('Dashboard')}
        style={getScreenItemStyle('Dashboard')}
        labelStyle={[
          styles.drawerLabel,
          selectedScreen === 'Dashboard' && {color: 'green'},
        ]}
      />
      <DrawerItem
        label="My Stores"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
      />
      <DrawerItem
        label="Intractions"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
      />
      <DrawerItem
        label="Analytics"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
      />
      <DrawerItem
        label="Marketing Tools"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
      />
      <DrawerItem
        label="Account Settings"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Hide the header
      }}>
          <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="ActivateStore" component={ActivateStore} />
    </Drawer.Navigator>
  );
};

const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};




const App = () => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const transitionConfig = {
    animation: 'timing',
    config: { duration: 200 },
  };

  const screenOptions = {
    headerShown: false,
    gestureDirection: 'horizontal',
    ...TransitionPresets.SlideFromRightIOS,
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          transform: [{ scale: Animated.multiply(progress, scaleValue) }],
        },
      };
    },
  };

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={screenOptions}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login}  />
            <Stack.Screen name="Main" component={SignUpScreen}/>
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="AboutBusiness" component={AboutBusiness} />
            <Stack.Screen name="UpgradePlan" component={UpgradePlan} />
            <Stack.Screen name="AddBusiness" component={AddBusiness} />
            <Stack.Screen name="Dashboard" component={DrawerNavigator} />
            <Stack.Screen name="ActivateStore" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, // Reduced padding top
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: -90,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 1,
  },
  selectedItem: {
    paddingVertical: 1,
  },
});
