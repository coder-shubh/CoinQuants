import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import Colors from "../utils/colors";
import LinearGradient from 'react-native-linear-gradient';
import gradientColors from "../utils/GradientColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFcmToken, getFcmTokenFromLocalStorage, notificationListener, requestUserPermission } from "../Components/Notification/Notification";
import Globals from "../utils/Globals";
const LoaderAnimation = require('../assets/animation_lmzwwr3b.json');




export default function SplashScreen({ navigation }) {


    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn');
        }, 3000);
    }, [navigation]);





    return (
        <LinearGradient colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.5, y: 0.2 }}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <Image style={styles.image} source={require('../assets/SplashIcon.png')} resizeMode="contain" />
            <LottieView style={styles.animate} source={LoaderAnimation} autoPlay loop
                colorFilters={[
                    {
                        keypath: "asdf",
                        color: "#30853A",
                    }
                ]} />

        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: '60%',
        height: '60%'
    },
    animate: {
        width: 70,
        height: 70,
        backgroundColor: 'transparent',
        top: 30,
        color: '#30853A',
        tintColor: '#30853A',
        overlayColor: '#30853A',
    }
});