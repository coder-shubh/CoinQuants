import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';


export default function CustomHeaderClose({ title }) {

    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigator' }],
                });
            }}>
                <Image style={styles.image} resizeMode='contain' source={require('../assets/icon.png')} />
            </TouchableOpacity>
            <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Regular' }}>{title}</Text>
            <MaterialIcons name="close" size={30} color="#fff" onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabNavigator' }],
                });
            }} />
        </View>
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