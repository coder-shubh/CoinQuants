import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';


export default function CustomCloseHeader() {


    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigator' }],
                });
            }} activeOpacity={0.5}>
                <Image style={styles.image} resizeMode='contain' source={require('../assets/icon.png')} />
            </TouchableOpacity>

            <MaterialIcons name="close" size={30} color="#fff" onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigator' }],
                });
            }} />
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.Secondary_theme, height: 50, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 10
    },
    image: {
        height: 30,
        width: 30
    }
})