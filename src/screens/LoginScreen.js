import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {loginUser} from '../redux/slices/login-slice';
import {useDispatch, useSelector} from 'react-redux';
import {client_id, client_secret} from '../constants/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.login);


  console.log(authUser, "my state")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState({
    email: false,
    password: false,
  });

  const handleChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const toggleActive = name => {
    setActive({...active, [name]: !active[name]});
  };


  const loginNow = async () => {
    try {
      setLoading(true);
      const payload = {
        grant_type: 'password',
        client_id: client_id,
        client_secret: client_secret,
        username: email,
        password: password,
        scope: '',
      };
  
      const response = await dispatch(loginUser(payload));
    console.log('Login Response:', response); // Log the API response

    if (response?.payload?.body?.access_token) {
      await AsyncStorage.setItem('accessToken', response?.payload?.body?.access_token);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.payload?.body?.user));

      console.log('Login Successful!');
      navigation.navigate('Dashboard');
    } else {
      console.log('Login Failed: No access token provided.');
      Alert.alert('Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login Error:', error);
    Alert.alert('An error occurred while logging in. Please try again later.');
  } finally {
    setLoading(false);
  }
};

 

  return (
    <ScrollView>
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View>
            <Image
              source={require('../assets/splash.png')}
              style={{
                marginTop: 10,
                width: 200,
                height: 200,
                marginLeft: 80,
                marginBottom: -80,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.625}}>
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
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <Input
                password
                viewPass
                color="black"
                iconColor="white"
                placeholder="Password"
                bgColor="transparent"
                onBlur={() => toggleActive('password')}
                onFocus={() => toggleActive('password')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('password', text)}
                style={[
                  styles.input,
                  active.password ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd', inputColor: 'black'},
                ]}
              />
            </Block>
            <Block center flex style={{marginTop: 20}}>
              <Button
                size="medium"
                shadowless
                color="#20B340"
                style={{height: 48}}
                onPress={loading ? null : loginNow} // Disable button while loading
              >
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
                  style={{marginTop: -10, color: 'black'}}>
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
              <TouchableOpacity style={styles.container1}>
                <View style={styles.googleLogo}>
                  <Image
                    source={require('../assets/google.png')}
                    style={styles.googleLogoImage}
                  />
                </View>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </TouchableOpacity>
              <View style={{marginTop: 15}}>
                <TouchableOpacity style={styles.container1}>
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
                <TouchableOpacity style={styles.container1}>
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
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
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
});

export default Login;
