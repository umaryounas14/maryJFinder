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
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';

const {width} = Dimensions.get('window');

const Verification = ({navigation}) => {
  const handleVerifyEmail = () => {
    // Logic to handle verification
    Linking.openURL('http://example.com/verify');
  };

  const handleResendEmail = () => {
    // Logic to resend email
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
                marginLeft: 70,
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
              }}>
              Verify Email
            </Text>
          </Block>
          <View style={styles.container1}>
            <Text style={styles.text}>We sent an email to test@gmail.com.</Text>
            <TouchableOpacity onPress={handleVerifyEmail} style={styles.link}>
              <Text style={styles.linkText}>
                Click the link to verify your email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleResendEmail}
              style={styles.resendButton}>
              <Text style={styles.resendText}>Resend Email</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    marginTop: -15,
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resendText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Verification;
