import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
import MyStores from './src/screens/MyStores';
import Reports from './src/screens/Reports';
import Selection from './src/screens/Selection';
import BusinessSignUp from './src/screens/BusinessSignUp';
import OtpVerify from './src/screens/OtpVerify';
import ChatScreen from './src/screens/ChatScreen';
import ChatDrawer from './src/routes/ChatDrawer';
import { ThemeProvider } from './src/context/themeContext';
import Analytics from './src/screens/Analytics';
import Intractions from './src/screens/Intractions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductScreen from './src/screens/ProductScreen';
import ProductDetails from './src/screens/ProductDetails';
import AddToCart from './src/screens/AddToCart';

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
  const getLabelStyle = (screenName) => {
    return selectedScreen === screenName ? { color: 'green' } : { color: 'black' };
  };
  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./src/assets/splash.png')}
          style={styles.image}
        />
      </View>
      <DrawerItem
        label="Dashboard"
        onPress={() => handleScreenPress('Dashboard')}
        style={getScreenItemStyle('Dashboard')}
        // labelStyle={[
        //   styles.drawerLabel,
        //   selectedScreen === 'Dashboard' && {color: 'green'},
        // ]}
        labelStyle={[styles.drawerLabel, getLabelStyle('Dashboard')]}
        icon={() => <Icon name="dashboard" size={24} color="black" />}
      />
      <DrawerItem
        label="My Stores"
        onPress={() => handleScreenPress('MyStores')}
        style={getScreenItemStyle('MyStores')}
        icon={() => <Icon name="store" size={24} color="black" />}
        labelStyle={getLabelStyle('MyStores')}
      />
 <DrawerItem
        label="My chat"
        onPress={() => handleScreenPress('ChatScreen')}
        style={getScreenItemStyle('MyStores')}
        icon={() => <Icon name="chat" size={24} color="black" />}
      />

      <DrawerItem
        label="Intractions"
        onPress={() => handleScreenPress('Intractions')}
        style={getScreenItemStyle('Intractions')}
        icon={() => <Icon name="ads-click" size={24} color="black" />}
        labelStyle={getLabelStyle('Intractions')}
      />
      <DrawerItem
        label="Analytics"
        onPress={() => handleScreenPress('Analytics')}
        style={getScreenItemStyle('Analytics')}
        icon={() => <Icon name="analytics" size={24} color="black" />}
        labelStyle={getLabelStyle('Analytics')}
      />
      <DrawerItem
        label="Marketing Tools"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
        icon={() => <Icon name="build" size={24} color="black" />}
      />
      <DrawerItem
        label="Account Settings"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
        icon={() => <Icon name="settings" size={24} color="black" />}
      />
      <DrawerItem
        label="Reports"
        onPress={() => handleScreenPress('Reports')}
        style={getScreenItemStyle('Reports')}
        icon={() => <Icon name="edit-document" size={24} color="black" />}
        labelStyle={getLabelStyle('Reports')}
      />
      <DrawerItem
        label="Support"
        onPress={() => handleScreenPress('SignUpScreen')}
        style={getScreenItemStyle('SignUpScreen')}
        icon={() => <Icon name="support" size={24} color="black" />}

      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        animationEnabled: true,
        swipeEnabled: true,
        gestureEnabled: true,
        drawerStyle: { width: '65%', borderBottomRightRadius: 30, borderTopRightRadius: 30},
        overlayColor: 'transparent',
        drawerType: "slide",
        drawerAnimation: 'slide',   }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} /> 
      <Drawer.Screen name="ChatScreen" component={ChatDrawer} /> 
      <Drawer.Screen name="MyStores"  component={MyStores} />
      <Drawer.Screen name="Reports"   component={Reports} />
      <Drawer.Screen name="Analytics" component={Analytics} />
      <Drawer.Screen name="Intractions" component={Intractions} />
    </Drawer.Navigator>
  );
};
const App = () => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const transitionConfig = {
    animation: 'timing',
    config: {duration: 300},
  };
  const screenOptions = {
    headerShown: false,
    gestureDirection: 'horizontal',
    ...TransitionPresets.SlideFromRightIOS,
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          transform: [{scale: Animated.multiply(progress, scaleValue)}],
        },
      };
    },
  };

  return (
    <ThemeProvider>
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={screenOptions}>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> 
            <Stack.Screen name="Selection" component={Selection} />
            <Stack.Screen name="Login" component={Login} /> 
            <Stack.Screen name='SignUpScreen' component={SignUpScreen}/> */}
            {/* <Stack.Screen name="BusinessSignUp" component={BusinessSignUp} />  */}
            {/* <Stack.Screen name="Main" component={SignUpScreen} />  
            <Stack.Screen name="Verification" component={Verification} /> 
            <Stack.Screen name="About" component={About} /> 
            <Stack.Screen name="AboutBusiness" component={AboutBusiness} />
            <Stack.Screen name="UpgradePlan" component={UpgradePlan} /> 
            <Stack.Screen name="AddBusiness" component={AddBusiness} />  */}
            <Stack.Screen name="Dashboard" component={DrawerNavigator} /> 
            <Stack.Screen name="ActivateStore" component={ActivateStore} /> 
            <Stack.Screen name="OtpVerify" component={OtpVerify} /> 
            <Stack.Screen name="ChatScreen"     component={ChatDrawer} />   
            <Stack.Screen name="ProductScreen"  component={ProductScreen} />  
            <Stack.Screen name='ProductDetails' component={ProductDetails}/>
            <Stack.Screen name='AddToCart' component={AddToCart}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </ThemeProvider>
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
