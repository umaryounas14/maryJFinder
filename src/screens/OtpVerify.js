import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {otpVerify} from '../redux/slices/OtpVerifySlice';
import {client_id, client_secret} from '../constants/configs';

const OtpVerify = ({route, navigation}) => {
  const {email, password} = route.params;
  const account = useSelector(state => state.businessAccount);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const refs = useRef([]);
  const dispatch = useDispatch();

  const verifyNow = async () => {
    try {
      setLoading(true);
      const payload = {
        email: email,
        password: password,
        grant_type: 'password',
        client_id: client_id,
        client_secret: client_secret,
        username: email,
        scope: '',
        code: code,
      };
      console.log(code, code);
      const response = await dispatch(otpVerify(payload));
      // Check if access_token and account_type are present in the response
      const accessToken = response.payload?.body?.access_token;
      const accountType = account?.user?.body?.user?.account_type;

      // If access_token is present and account_type is 'business', navigate to 'AboutBusiness'
      if (accessToken && accountType === 'business') {
        navigation.navigate('AboutBusiness');
      }
      // If only access_token is present, navigate to 'About'
      else if (accessToken) {
        navigation.navigate('About');
      }

      setLoading(false);
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.logo} />

      <Text style={styles.headerText}>Please verify your Email</Text>

      {/* OTP Input Fields */}
      <View style={styles.inputContainer}>
        {[...Array(6).keys()].map(index => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => {
              // Auto focus to next input field
              if (text && index < 5) {
                refs.current[index + 1].focus();
              }
              // Store OTP
              const newOtp = code + text;
              setCode(newOtp);
            }}
            ref={input => (refs.current[index] = input)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={verifyNow}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 250,
  },
  logo: {
    width: 250,
    height: 200,
    marginLeft: 30,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: -50,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    height: 40,
    textAlign: 'center',
    marginRight: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpVerify;
