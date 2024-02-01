import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gradientColors from '../../utils/GradientColor';
import Colors from '../../utils/colors';
import CustomButton from '../../Components/CustomButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ModalPopup from '../../Components/ModalPopup';
import { useOtpVerifyViewModel } from './useOtpVerifyViewModel';


export default function OtpVerify({ navigation, route }) {
    const viewModel = useOtpVerifyViewModel(navigation, route);
    const { number, countryCode } = route.params;

    return (
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0.2 }} style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <ModalPopup modalVisible={viewModel.modalVisible} />

            <Image style={{ height: 50, width: '50%', marginTop: 10 }} resizeMode='contain' source={require('../../assets/CoinQuant.png')} />

            <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 40, width: '80%' }}>
                <Text style={{ color: Colors.textColor, fontFamily: 'Inter-Bold', fontSize: 29 }}>Phone Verification</Text>
                <Text style={{ color: Colors.textColor, fontSize: 14, fontFamily: 'Inter-Regular' }}>Please enter the 6-digit verification code  your number <Text style={{ color: Colors.buttonPrimaryColor, fontFamily: 'Inter-Bold', }}>{countryCode}-xxxxxxx.</Text></Text>
            </View>

            <View style={styles.OTPContainer}>
                <OTPInputView
                    codeInputFieldStyle={[styles.input, { width: 54, color: '#fff', height: 50, }]}
                    onCodeFilled={viewModel.handleOtpInput}
                    codeInputHighlightStyle={{ borderWidth: 1.5, borderColor: '#30853A' }}
                    pinCount={6}
                    selectionColor='#30853A'
                    keyboardType='number-pad'
                    autoFocusOnLoad={false}
                    returnKeyType='done'
                />
            </View>

            <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
                <Text style={{ color: Colors.textColor, fontSize: 14, fontFamily: 'Inter-Regular' }}>This code is valid for {viewModel.timeLeft} seconds</Text>
            </View>
            <View style={{ width: '50%', marginTop: 20 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: viewModel.disable == false ? Colors.buttonPrimaryColor : '#808080' }]} activeOpacity={0.5} onPress={() => { viewModel.fetchUser() }} disabled={viewModel.disable}>
                    <Text style={styles.title}>Resend Code</Text>
                </TouchableOpacity>
            </View>

            <View style={{ bottom: '5%', width: '100%', position: "absolute" }}>
                <CustomButton text={'Verify'} Press={() => { viewModel.UserVerify() }} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
    },
    OTPContainer: {
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },

    input: {
        height: 55,
        margin: 5,
        borderWidth: 1,
        fontSize: 20,
        backgroundColor: Colors.OtpInput,
        alignItems: "center",
        flexDirection: "row",
        width: 30,
        alignSelf: "center",
        borderColor: Colors.otpBorder,
        marginTop: 15,
        textAlign: 'center',
    },
    button: {
        height: 40,
        backgroundColor: Colors.buttonPrimaryColor,
        alignSelf: "center",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
    },
    title: {
        color: '#0D0444',
        fontFamily: 'Inter-Medium',
        fontSize: 14
    }
});
