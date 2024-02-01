// PersonalInformation.js
import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Keyboard,
    Platform,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gradientColors from '../../utils/GradientColor';
import Colors from '../../utils/colors';
import CustomButton from '../../Components/CustomButton';
import { usePersonalInformationViewModel } from './usePersonalInformationViewModel';
import ModalPopup from '../../Components/ModalPopup';
import ErrorPopup from '../../Components/ErrorPopup';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function PersonalInformation({ navigation }) {
    const viewModel = usePersonalInformationViewModel(navigation);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                viewModel.setButtonShow(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                viewModel.setButtonShow(false);
            }
        );

        // Cleanup function to remove the listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.5, y: 0.2 }}
            style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.Secondary_theme}
            />
            <ModalPopup modalVisible={viewModel.modalVisible} />
            <ErrorPopup
                visible={viewModel.errorVisible}
                errorMessage={viewModel.errorMessage}
                onClose={viewModel.closeErrorPopup}
            />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">

                {/* Logo */}
                <Image
                    style={{ height: 50, width: '50%', alignSelf: 'center' }}
                    resizeMode="contain"
                    source={require('../../assets/CoinQuant.png')}
                />

                {/* Title */}
                <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 40, width: '80%' }}>
                    <Text style={styles.title}>Personal Information</Text>
                </View>


                {/* Avatar */}
                <TouchableOpacity style={styles.avatarContainer} onPress={() => { viewModel.refCameraRBSheet.current.open() }} activeOpacity={0.5}>
                    {viewModel.FilePath == null ?
                        <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={require('../../assets/Avatar.png')} />
                        :
                        <Image style={{ height: '100%', width: '100%', borderRadius: 100, }} resizeMode='contain' source={{ uri: viewModel.FilePath }} />
                    }
                    <Image
                        style={{ height: '30%', width: '30%', position: 'absolute', left: 60, top: 55 }}
                        resizeMode="contain"
                        source={require('../../assets/Edit.png')}
                    />
                </TouchableOpacity>

                {/* Name and Surname Inputs */}
                <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.InputTitle}>Name</Text>
                        <TextInput
                            editable
                            value={viewModel.name}
                            onChangeText={(value) => viewModel.setName(value)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.InputTitle}>Surname</Text>
                        <TextInput
                            editable
                            value={viewModel.surname}
                            onChangeText={(value) => viewModel.setSurname(value)}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Email Input */}
                <View style={styles.emailContainer}>
                    <Image style={{ height: 20, width: 20 }} resizeMode="contain" source={require('../../assets/sms.png')} />
                    <View style={{ width: '90%' }}>
                        <Text style={styles.InputTitle}>Email</Text>
                        <TextInput
                            editable
                            value={viewModel.email}
                            onChangeText={(value) => viewModel.setEmail(value)}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Phone Number Input */}
                <View style={styles.phoneContainer}>
                    <Image style={{ height: 20, width: 20 }} resizeMode="contain" source={require('../../assets/call-calling.png')} />
                    <View style={{ width: '80%' }}>
                        <Text style={styles.InputTitle}>Phone No.</Text>
                        <TextInput
                            editable={false}
                            value={viewModel.phoneCode + ' ' + viewModel.phone}
                            onChangeText={(value) => viewModel.setPhone(value)}
                            style={styles.input}
                        />
                    </View>
                    <Image style={{ height: 20, width: 20, right: 5 }} resizeMode="contain" source={require('../../assets/Lock.png')} />
                </View>
            </ScrollView>
            {/* Next Button */}
            {viewModel.buttonShow == false &&
                <View style={styles.buttonContainer}>
                    <CustomButton text={'Next'} Press={() => viewModel.UserVerify()} width={'95%'} />
                </View>
            }



            <RBSheet
                ref={viewModel.refCameraRBSheet}
                height={150}
                openDuration={250}
                customStyles={{
                    container: { borderRadius: 20, width: '95%', alignSelf: 'center', backgroundColor: Colors.primary_theme_background }
                }}
            >
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => viewModel.chooseFile('photo')}>
                        <Text
                            style={styles.tv_cam_popup}>
                            Choose a Photo
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: 'grey' }}></View>
                    <TouchableOpacity
                        onPress={() => viewModel.captureImage('photo')}>
                        <Text
                            style={styles.tv_cam_popup}>
                            Take a New Photo
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 2, backgroundColor: 'grey' }}></View>
                    <TouchableOpacity
                        onPress={() => viewModel.refCameraRBSheet.current.close()}>
                        <Text
                            style={[styles.tv_cam_popup, { fontSize: 22, fontWeight: 'bold' }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                </View>
            </RBSheet>
        </LinearGradient>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: 'center'
    },
    title: {
        color: Colors.textColor,
        fontFamily: 'AnekBangla-Medium',
        fontSize: 32,
    },
    avatarContainer: {
        height: 80,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 40,
        marginTop: 20,
        alignSelf: 'center'
    },
    inputContainer: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '48%',
    },
    emailContainer: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '95%',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    phoneContainer: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '95%',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    buttonContainer: {
        bottom: '2%',
        width: '100%',
        position: 'absolute',
    },
    inputRow: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        marginTop: 20,
        alignSelf: 'center'
    },
    InputTitle: {
        color: Colors.textColor,
        fontSize: 16,
        fontFamily: 'AnekBangla-Medium',
        top: 10
    },
    input: {
        width: '100%',
        fontSize: 14,
        color: Colors.textColor,
    },
    tv_cam_popup: {
        alignSelf: 'center', fontSize: 18, height: 45,
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {
                textAlignVertical: 'center'
            }
        }), color: Colors.textColor
    },
});

