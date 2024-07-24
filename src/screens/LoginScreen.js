import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {authorize} from 'react-native-app-auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import {client_id, client_secret, web_client_id} from '../constants/configs';
import {loginUser} from '../redux/slices/loginSlice';
import {socialLoginGoogle} from '../redux/slices/googleLoginSlice';
import { BASE_URL } from '../constants/endpoints';
const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState({
    email: false,
    password: false,
  });

  const storeTokensAndUserData = async (accessToken, refreshToken, expiresIn, user) => {
    try {
      const expiryDate = new Date(Date.now() + expiresIn * 1000); // Calculate expiry date
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('accessTokenExpiry', expiryDate.toString()); // Store expiry date
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing tokens and user data:', error);
      throw error;
    }
  };


  const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }
      const payload = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: client_id,
        client_secret: client_secret,
        scope: '',
      };
     
      const response = await fetch(`${BASE_URL}token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();

      // Update AsyncStorage with new access token
      await AsyncStorage.setItem('accessToken', data.access_token);

      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          // No access token found, user needs to login
          return;
        }

        // Check expiry date
        const expiryDateString = await AsyncStorage.getItem('accessTokenExpiry');
        if (!expiryDateString) {
          throw new Error('Access token expiry information not found');
        }

        const expiryDate = new Date(expiryDateString);
        if (expiryDate > new Date()) {
          // Access token is valid, continue with app initialization
          return;
        }

        // Access token expired, refresh it
        const refreshedAccessToken = await refreshAccessToken();
        if (refreshedAccessToken) {
          // Update state or context with refreshed access token
        } else {
          // Handle error refreshing token or re-authentication
          // Redirect to login screen or display error message
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
        // Handle error checking token validity
      }
    };

    checkTokenValidity();
  }, []);

  const config = {
    issuer: 'https://login.microsoftonline.com/common',
    clientId: 'f892cf70-038a-44f3-968c-0862eea736ab',
    redirectUrl: 'msauth://com.maryjfinder/WnC5CvtgsHyvmEjcetAuTTR0dCs%3D',
    scopes: ['openid', 'profile', 'email', 'User.Read', 'offline_access'],
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
    additionalParameters: {prompt: 'select_account'},
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      webClientId: web_client_id,
    });
  }, []);

  const handleChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const toggleActive = name => {
    setActive({...active, [name]: !active[name]});
  };

  const loginNow = async () => {
    setLoading(true);

    const payload = {
      grant_type: 'password',
      client_id: client_id,
      client_secret: client_secret,
      username: email,
      password: password,
      scope: '',
    };

    try {
      const response = await dispatch(loginUser(payload));

      if (response?.payload?.body?.access_token) {
        const { access_token, refresh_token, expires_in, user } = response.payload.body;        
        await storeTokensAndUserData(
          access_token,
          refresh_token,
          expires_in,
          user
        );

        console.log('Login Successful!');
        navigation.navigate('ChatScreen', { accessToken: response?.payload?.body?.access_token  });
        navigation.reset({
          index: 0,
          routes: [{ name: 'ChatScreen' }],
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const accessToken = await GoogleSignin.getTokens().then(
      tokens => tokens.accessToken,
    );
    const payload = {
      grant_type: 'password',
      client_id: client_id,
      client_secret: client_secret,
      email: userInfo.user.email,
      scope: '',
      provider: 'google',
      access_token: accessToken,
    };
    try {
      const response = await dispatch(socialLoginGoogle(payload));
      if (response?.payload?.body?.access_token) {
        await AsyncStorage.setItem(
          'accessToken',
          response?.payload?.body?.access_token,
        );
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response?.payload?.body?.user),
        );
        console.log('Login Successful!');
        navigation.navigate('ChatScreen', { accessToken: response?.payload?.body?.access_token });
        navigation.reset({
          index: 0,
          routes: [{name: 'ChatScreen'}],
        });
      } else if (response?.error) {
        console.log(response.error.message, 'message');
        Alert.alert(response.error.message);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    console.log('Attempting Microsoft sign-in...');
    setLoading(true);
    const result = await authorize(config);
    console.log('Authorization result:', result);
    const payload = {
      grant_type: 'password',
      client_id: client_id,
      client_secret: client_secret,
      email: email,
      scope: '',
      provider: 'microsoft',
      access_token: result.accessToken,
    };
    try {
      const response = await dispatch(socialLoginGoogle(payload));
      if (response?.payload?.body?.access_token) {
        await AsyncStorage.setItem(
          'accessToken',
          response?.payload?.body?.access_token,
        );
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response?.payload?.body?.user),
        );
        navigation.navigate('ChatScreen', { accessToken: response?.payload?.body?.access_token });
        navigation.reset({
          index: 0,
          routes: [{name: 'ChatScreen'}],
        });
      }
    } catch (error) {
      console.error('Microsoft sign-in error:', error);
      Alert.alert('Failed to sign in with Microsoft. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const onAppleButtonPress = async () => {
    setLoading(true);
    await appleAuthAndroid.configure({
      clientId: 'com.maryjfinder.client-android',
      redirectUri: 'https://maryjfinder.com/auth/callback',
      scope: appleAuthAndroid.Scope.ALL,
      responseType: appleAuthAndroid.ResponseType.ALL,
    });

    const response = await appleAuthAndroid.signIn();

    const {code, id_token, user, state} = response;
    console.log('Got auth code', code);
    console.log('Got id_token', id_token);
    console.log('Got user', user);
    console.log('Got state', state);

    const payload = {
      grant_type: 'password',
      client_id: client_id,
      client_secret: client_secret,
      email: email,
      scope: '',
      provider: 'microsoft',
      access_token: id_token,
    };
    try {
      const response = await dispatch(socialLoginGoogle(payload));


      if (response?.payload?.body?.access_token) {
        await AsyncStorage.setItem(
          'accessToken',
          response?.payload?.body?.access_token,
        );
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response?.payload?.body?.user),
        );
        navigation.navigate('ChatScreen', { accessToken: response?.payload?.body?.access_token });
        navigation.reset({
          index: 0,
          routes: [{name: 'ChatScreen'}],
        });
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      Alert.alert('Failed to sign in with Apple. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Block flex middle>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{height: 150}}>
          <Image
            source={require('../assets/splash.png')}
            style={styles.image}
          />
        </View>
        <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.5}}>
          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: '500',
              marginLeft: 20,
            }}>
            Welcome Back{' '}
          </Text>
        </Block>
        <Block flex>
          <Block center>
            <Input
              color="black"
              placeholder="Email Address"
              type="email-address"
              autoCapitalize="none"
              bgColor="transparent"
              onBlur={() => toggleActive('email')}
              onFocus={() => toggleActive('email')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={text => handleChange('email', text)}
              style={[
                styles.input,
                active.email ? styles.inputActive : null,
                {
                  borderRadius: 15,
                  borderColor: '#ddd',
                },
              ]}
            />
            <Input
              password
              viewPass
              color="black"
              iconColor="black"
              placeholder="Password"
              bgColor="transparent"
              onBlur={() => toggleActive('password')}
              onFocus={() => toggleActive('password')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={text => handleChange('password', text)}
              style={[
                styles.input,
                active.password ? styles.inputActive : null,
                {
                  borderRadius: 15,
                  borderColor: '#ddd',
                  inputColor: 'black',
                },
              ]}
            />
          </Block>
          <Block center flex style={{marginTop: 20}}>
            <Button
              size="medium"
              shadowless
              color="#20B340"
              style={{height: 48}}
              onPress={loading ? null : loginNow}>
              {loading ? <ActivityIndicator color="white" /> : 'Login'}
            </Button>
            <Button
              size="large"
              color="transparent"
              shadowless
              onPress={() => navigation.navigate('Main')}>
              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{
                  marginTop: -10,
                  color: 'black',
                }}>
                {"Don't have Account? SignUp Now"}
              </Text>
            </Button>
          </Block>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              style={styles.customGoogleButton}
              onPress={handleGoogleSignIn}>
              <View style={styles.googleLogo}>
                <Image
                  source={require('../assets/google.png')}
                  style={styles.googleLogoImage}
                />
              </View>
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                style={styles.container1}
                onPress={handleMicrosoftSignIn}>
                <View style={styles.googleLogo}>
                  <Image
                    source={require('../assets/microsoft.png')}
                    style={styles.googleLogoImage}
                  />
                </View>
                <Text style={styles.buttonText}>
                  Continue Microsoft Account
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                style={styles.container1}
                onPress={onAppleButtonPress}>
                <View style={styles.googleLogo}>
                  <Image
                    source={require('../assets/apple.png')}
                    style={styles.googleLogoImage}
                  />
                </View>
                <Text style={styles.buttonText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? HeaderHeight + 10 : 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 30,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    color: 'black',
  },
  inputActive: {
    borderBottomColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: -7,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#a19f9a',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: -10,
    marginLeft: 30,
  },
  googleLogo: {
    marginRight: 10,
  },
  googleLogoImage: {
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  customGoogleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: -10,
    marginLeft: 30,
  },
});
export default Login;
