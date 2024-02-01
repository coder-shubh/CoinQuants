import React from "react";
import { View, Image } from 'react-native';
import Colors from "../utils/colors";


export default function CustomView() {


    return (

        <View style={{ flex: 1, backgroundColor: Colors.Secondary_theme, alignItems: "center" }}>
            <Image style={{ height: 150, width: 150, position: "absolute", left: -34, top: 20 }} resizeMode="contain" source={require('../assets/Ellipse2.png')} />
            <Image style={{ height: 150, width: 150, position: "absolute", right: -34, top: 70 }} resizeMode="contain" source={require('../assets/Ellipse1.png')} />


        </View>


    )
}