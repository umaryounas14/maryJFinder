// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Simulate a delay to display the splash screen for 2 seconds
        const timer = setTimeout(() => {
            // Navigate to the main screen after 2 seconds
            navigation.replace('Main');
        }, 2000);

        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../assets/splash.png')} // Replace with your background image
                style={styles.backgroundImage}
            /> */}

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
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    logo: {
        width: 400,
        height: 400,
        marginLeft: 70,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
