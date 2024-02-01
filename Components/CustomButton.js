import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../utils/colors';

export default function CustomButton({ text, Press, width, height, fontSize, disable, color }) {

    return (
        <TouchableOpacity style={[styles.button, { width: width != null ? width : '90%', height: height == null ? 58 : height, backgroundColor: color ? color : Colors.buttonPrimaryColor }]} onPress={Press} activeOpacity={0.5} disabled={disable}>
            <Text style={[styles.title, { fontSize: fontSize == null ? 20 : fontSize, }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 58,
        backgroundColor: Colors.buttonPrimaryColor,
        alignSelf: "center",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: '#0D0444',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    }
})

