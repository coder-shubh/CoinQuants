import React from 'react';
import { View, Text, StatusBar, Image, Alert } from 'react-native';
import Colors from '../../utils/colors';
import CustomButton from '../../Components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import PaymentSuccessViewModel from './PaymentSuccessViewModel';
import ModalPopup from '../../Components/ModalPopup';

export default function PaymentFailed({ navigation, route }) {
    const viewModel = PaymentSuccessViewModel();
    const { code } = route.params;
    const { message } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.Secondary_theme, alignItems: 'center' }}>
            <ModalPopup modalVisible={viewModel.modalVisible} />

            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <Image style={{ height: 150, width: 150, position: "absolute", left: -34 }} resizeMode="contain" source={require('../../assets/Ellipse2.png')} />

            <Image style={{ height: 150, width: 150, position: "absolute", right: -30, top: 40 }} resizeMode="contain" source={require('../../assets/Ellipse1.png')} />

            <Text style={{ fontSize: 32, color: Colors.textColor, fontFamily: 'AnekBangla-Regular', marginTop: '15%' }}>
                {viewModel.title}
            </Text>

            <View style={{ height: '55%', width: '90%', backgroundColor: '#18087B', elevation: 5, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', padding: 10, marginTop: 60 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 50 }}>
                    <MaterialIcons name="closecircle" size={54} color="#850101" />
                </View>
                <Text style={{ fontSize: 32, color: Colors.textColor, fontFamily: 'AnekBangla-Regular', marginTop: 20 }}>
                    {viewModel.message}
                </Text>
                <View style={{ alignSelf: 'flex-start' }}>
                    {/* <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18, marginTop: 30 }}>{code.code}</Text> */}
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18, }}>
                        {message}
                    </Text>
                </View>

                {/* <View style={{ alignSelf: 'flex-start', marginTop: 20, width: '85%' }}>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18 }}>
                        {viewModel.emailMessage}
                    </Text>
                </View> */}

                {/* <View style={{ alignSelf: 'flex-start', marginTop: 20, }}>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18 }}>
                        {viewModel.timestamp}
                    </Text>
                </View> */}
            </View>

            <View style={{ width: '100%', bottom: '5%', alignSelf: 'center', position: 'absolute' }}>
                <CustomButton text={'Back to Home'} Press={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'BottomTabNavigator' }],
                    });
                }} />
            </View>
        </View>
    );
}
