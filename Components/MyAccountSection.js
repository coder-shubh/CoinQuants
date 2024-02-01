import React from 'react';
import { View, TouchableOpacity, Text, StatusBar, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import Colors from '../utils/colors';
import Icon from 'react-native-vector-icons/Entypo';
import ToggleSwitch from 'toggle-switch-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function MyAccountSection({ title, press }) {

    return (
        <TouchableOpacity style={[styles.Container, { marginTop: title === 'My Account' ? 15 : 30 }]} activeOpacity={0.5} onPress={press}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Icon name='chevron-thin-right' size={15} color={'#FFFFFF'} underlayColor={'#8D9092'} style={styles.icon} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Rubik-Regular',
        fontSize: 18,
        color: Colors.textColor,
        left: 15
    },
    icon: {
        backgroundColor: Colors.primary_theme_background
    }
})
