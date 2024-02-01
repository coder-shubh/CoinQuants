import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';


export default function CustomHeader() {

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} resizeMode='contain' source={require('../assets/icon.png')} />
            <MaterialIcons name="menu-sharp" size={30} color="#fff" style={{
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