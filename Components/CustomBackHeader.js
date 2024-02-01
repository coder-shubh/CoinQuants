import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';


export default function CustomBackHeader() {


    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <MaterialIcons name="arrowleft" size={24} color="#fff" onPress={() => { navigation.goBack() }} />

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