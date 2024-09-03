import React, {useState} from 'react';
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
import {signUpUser} from '../redux/slices/signUpSlice';
import {useDispatch, useSelector} from 'react-redux';
import {client_id, client_secret} from '../constants/configs';
import Icon from 'react-native-vector-icons/AntDesign'; // Import AntDesign icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
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

  const dispatch = useDispatch();
  const signUpNow = async () => {
    try {
      setLoading(true);
      const payload = {
        email: email,
        password: password,
        terms: true,
        grant_type: 'password',
        client_id: client_id,
        client_secret: client_secret,
        username: email,
        scope: '',
      };
      const response = await dispatch(signUpUser(payload));

      if (response?.payload?.body?.message) {
        navigation.navigate('OtpVerify', {email: email, password: password});
      }
       if (response?.payload?.body?.access_token)
        await AsyncStorage.setItem(
          'accessToken',
          response?.payload?.body?.access_token,
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'About' }],
        });

      setLoading(false);
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Block flex middle>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity> */}
          <View style = {{ height: 150}}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.image}
            />
          </View>
          <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.625}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000000',
                fontWeight: '500',
                marginLeft: 10,
              }}>
              Create an Account
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
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
            </Block>
            <Block center flex style={{marginTop: 20}}>
              <Button
                size="medium"
                shadowless
                color="#20B340"
                style={{height: 48}}
                onPress={loading ? null : signUpNow} // Disable button while loading
                >
                  {loading ? <ActivityIndicator color="white" /> : 'Create Account'}
              </Button>
              <Button
                size="large"
                color="transparent"
                shadowless
                onPress={() => navigation.navigate('Login')}>
                <Text
                  center
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT * 0.75}
                  style={{marginTop: -10, color: 'black'}}>
                  {'Already have an account? Login'}
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
    top: Platform.OS === 'ios' ? HeaderHeight + 10 : 10, // Adjust for different platform header heights
    left: 10,
    zIndex: 1, // Ensure it's above other components
    padding: 10,
  },

  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center', // Center the image horizontally
    marginTop: 10, // Add margin top as needed
    marginLeft: 30,
  },

  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
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
    color: 'black',
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

export default SignUpScreen;
