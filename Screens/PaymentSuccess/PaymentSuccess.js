import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import Colors from '../../utils/colors';
import CustomButton from '../../Components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import PaymentSuccessViewModel from './PaymentSuccessViewModel';
import ModalPopup from '../../Components/ModalPopup';

export default function PaymentSuccess({ navigation, route }) {
    const { subscription_id } = route.params;

    const viewModel = PaymentSuccessViewModel(subscription_id);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.Secondary_theme, alignItems: 'center' }}>
            <ModalPopup modalVisible={viewModel.modalVisible} />

            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <Image style={{ height: 150, width: 150, position: "absolute", left: -34 }} resizeMode="contain" source={require('../../assets/Ellipse2.png')} />

            <Image style={{ height: 150, width: 150, position: "absolute", right: -30, top: 40 }} resizeMode="contain" source={require('../../assets/Ellipse1.png')} />

            <Text style={{ fontSize: 32, color: Colors.textColor, fontFamily: 'AnekBangla-Regular', marginTop: '15%' }}>
                {viewModel.title}
            </Text>

            <View style={{ height: '58%', width: '90%', backgroundColor: '#18087B', elevation: 5, borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: 'center', padding: 10, marginTop: 60 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 50 }}>
                    <MaterialIcons name="checkcircle" size={54} color="#3CAF47" />
                </View>
                <Text style={{ fontSize: 32, color: Colors.textColor, fontFamily: 'AnekBangla-Regular', marginTop: 10 }}>
                    {viewModel.message}
                </Text>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18, marginTop: 10 }}>Thank you!</Text>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18, }}>
                        {viewModel.orderNumber}
                    </Text>
                </View>

                <View style={{ alignSelf: 'flex-start', marginTop: 20, width: '85%' }}>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18 }}>
                        {viewModel.emailMessage}
                    </Text>
                </View>

                <View style={{ alignSelf: 'flex-start', marginTop: 20, }}>
                    <Text style={{ fontFamily: 'AnekBangla-Regular', color: Colors.textColor, fontSize: 18 }}>
                        {viewModel.timestamp}
                    </Text>
                </View>
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
