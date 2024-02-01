import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gradientColors from '../../utils/GradientColor';
import Colors from '../../utils/colors';
import { CountryPicker } from "react-native-country-codes-picker";
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from '../../Components/CustomButton';
import { useSignInViewModel } from './useSignInViewModel';
import ModalPopup from '../../Components/ModalPopup';

export default function SignIn({ navigation }) {
    const viewModel = useSignInViewModel(navigation);

    return (
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0.2 }} style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <ModalPopup modalVisible={viewModel.modalVisible} />

            <Image style={{ height: 50, width: '50%', marginTop: 10 }} resizeMode='contain' source={require('../../assets/CoinQuant.png')} />
            <SafeAreaView>
                <View style={{ alignSelf: 'flex-start', margin: 20 }}>
                    <Text style={{ color: Colors.textColor, fontFamily: 'Inter-Bold', fontSize: 29, }}>Log In/Sign Up</Text>
                    <Text style={{ color: Colors.textColor, fontSize: 17, opacity: 0.5, fontFamily: 'Inter-Regular' }}>Please enter your number </Text>
                </View>

                <View style={{ margin: 20, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ borderBottomColor: '#FFFFFF', borderBottomWidth: 1, width: '25%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }} onPress={() => { viewModel.setShow(true) }} activeOpacity={0.5}>
                            <Text style={{ color: Colors.textColor, fontFamily: 'Inter-Bold', textAlign: 'center', fontSize: 16 }}>{viewModel.countryFlag} {viewModel.countryCode}</Text>
                            <Icon name={"chevron-down"} size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, width: '70%' }}>
                        <TextInput
                            editable
                            numberOfLines={1}
                            placeholder='Phone Number'
                            placeholderTextColor={Colors.placeholdercolor}
                            maxLength={10}
                            value={viewModel.mobileNumber}
                            onChangeText={(value) => { viewModel.setMobileNumber(value) }}
                            style={{ width: '100%', fontSize: 17, color: Colors.textColor, bottom: 5 }}
                            keyboardType='number-pad'
                            returnKeyType='done'
                        />
                    </View>
                </View>
                {viewModel.error ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{viewModel.error}</Text>
                ) : null}
                {/* <View style={{ alignSelf: 'flex-start', margin: 20 }}>
                    <Text style={{ color: Colors.textColor, fontSize: 17, opacity: 0.5, fontFamily: 'Inter-Regular' }} onPress={() => { navigation.navigate('SignUp') }}>Don’t have an account?</Text>
                </View> */}

                <CountryPicker
                    show={viewModel.show}
                    onRequestClose={() => viewModel.setShow(false)}
                    style={{
                        modal: { height: 500, backgroundColor: '#000' },
                        countryButtonStyles: { backgroundColor: Colors.primary_theme_background },
                        countryName: { color: '#fff' },
                        dialCode: { color: '#fff' },
                        flag: { color: '#fff' },
                        line: { backgroundColor: Colors.primary_theme_background },
                        textInput: { backgroundColor: Colors.primary_theme_background, color: '#fff' }
                    }}
                    pickerButtonOnPress={(item) => viewModel.closePicker(item)}
                />


            </SafeAreaView>
            <View style={{ bottom: '5%', width: '100%', position: "absolute" }}>
                <CustomButton text={'Log In'} Press={() => { viewModel.UserLogin() }} />
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
});
