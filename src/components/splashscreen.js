import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkAccessToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    navigation.replace('Dashboard');
                } else {
                    navigation.replace('Selection');
                }
            } catch (error) {
                console.error('Error reading access token from AsyncStorage:', error);
                navigation.replace('Login');
            }
        };
        const timer = setTimeout(() => {
            checkAccessToken();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/splash.png')}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 400,
        marginLeft: 70,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
