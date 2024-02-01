import { useState, useEffect } from 'react';
import { postApi } from '../../utils/ApiHandler';
import DeviceInfo from 'react-native-device-info';
import { getManufacturer } from 'react-native-device-info';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetdataFunction, PostdataFunction } from '../../utils/ApiCollection';
import Globals from '../../utils/Globals';

export function useOtpVerifyViewModel(navigation, route) {
    //const [countryCode, setCountryCode] = useState('+91');
    const [otpValues, setOtpValues] = useState('');
    const [disable, setDisable] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const { number, countryCode, otp } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [asyncDeviceInfo, setAsyncDeviceInfo] = useState({});
    const [deviceType, setDeviceType] = useState('');


    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                setDisable(true)
                //console.log(timeLeft)
            } else {
                setDisable(false)

            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);


    useEffect(() => {
        getDataAsync();
        alert(otp)
    }, []);

    const getDataAsync = async () => {
        let deviceJSON = {};
        try {
            deviceJSON.serialNumber = await DeviceInfo.getUniqueId();
        } catch {
            console.log(e);
        } finally {
            if (Platform.OS === 'ios') {
                setDeviceType('ios');
            } else if (Platform.OS === 'android') {
                setDeviceType('android');
            }
        }
        setAsyncDeviceInfo(deviceJSON);



    }



    async function getUserProfile(id) {
        try {
            setModalVisible(true);
            const result = await GetdataFunction('/user/' + id + '/status/');
            console.log('#$#$#$$#$#$', result.data.data)

            if (result.success) {
                const Data = result.data.data;
                if (Data.has_user_profile_setup == false) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'PersonalInformation' }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StrategiesList' }],
                    });
                }

            }
        } catch (e) {
            alert(e);
        } finally {
            setModalVisible(false);
        }
    }





    async function UserVerify() {

        if (!otpValues || otpValues.length !== 6 || !/^\d+$/.test(otpValues)) {
            alert('Please enter a valid 6-digit OTP.');
            return;
        }

        let info =
        {
            "otp": otpValues,
            "mobile_number": number,
            "device_id": asyncDeviceInfo.serialNumber,
            "status": true,
            "device_token": Globals.DeviceToken,
            "device_type": deviceType
        };
        console.log(info);
        try {
            setModalVisible(true);
            const result = await PostdataFunction('user/verify/', info);
            // console.log('%$$%$%%%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$4', result.data.data)


            if (result.success) {
                const Data = result.data.data;
                // console.log('%$$%$%$%$%$%', Data)
                SaveUser(Data.id);
            }
        }
        catch (e) {
            alert(e)
        }
        finally {
            setModalVisible(false);
        }

    }




    async function fetchUser() {


        let info =
        {
            "mobile_number": number,
            "phone_code": countryCode
        };
        console.log(info);
        try {
            setModalVisible(true);
            let res = await postApi({ url: 'user/session', json: info })
            console.log(":::::::::::::::::::::", res)
            if (res.data.otp) {
                alert(res.data.otp)
            }
        }
        catch (e) {
            alert(e)
        }
        finally {
            setModalVisible(false)

        }
    }


    const handleOtpInput = (code) => {
        setOtpValues(code);
        setDisable(true);
        setTimeLeft(30);
    };





    async function SaveUser(id) {
        try {
            AsyncStorage.setItem('id', id.toString());

        } catch (e) {
            console.log(e);
        }
        finally {
            getUser();
        }
    }


    async function getUser() {
        setModalVisible(true);
        try {
            const id = await AsyncStorage.getItem('id');
            if (id) {

                getUserProfile(id)

            }
        } catch (e) {
            console.log(e);
        } finally {
            setModalVisible(false);
        }

    }

    return {
        countryCode,
        otpValues,
        handleOtpInput,
        setDisable,
        disable,
        timeLeft,
        setTimeLeft,
        UserVerify,
        modalVisible,
        fetchUser,


    };
}

