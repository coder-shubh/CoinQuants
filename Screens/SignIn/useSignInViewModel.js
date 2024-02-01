import React, { useState } from 'react';
import { axiosInstance, postApi } from '../../utils/ApiHandler';
import Globals from '../../utils/Globals';
import { getFcmToken } from '../../Components/Notification/Notification';

export const useSignInViewModel = (props) => {
    const [countryCode, setCountryCode] = useState('+91');
    const [countryFlag, setCountryFlag] = useState('🇮🇳');
    const [mobileNumber, setMobileNumber] = useState('');
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');


    const closePicker = (item) => {
        setCountryCode(item.dial_code);
        setCountryFlag(item.flag);
        setShow(false);
        console.log(item);
    };


    const validateInputs = () => {
        // Simple validation example, you can add more complex checks as needed
        if (!mobileNumber.trim()) {
            setError('Please enter a valid phone number.');
            return false;
        }

        // You can add more validation checks for other fields if needed

        return true;
    };


    async function UserLogin() {
        if (!validateInputs()) {
            return;
        }

        let info =
        {
            "mobile_number": mobileNumber,
            "phone_code": countryCode
        };
        console.log(info);
        try {
            setModalVisible(true);
            let res = await postApi({ url: 'user/session', json: info })
            console.log(":::::::::::::::::::::", res)
            if (res.data.otp) {
                props.navigate('OtpVerify', { number: mobileNumber, countryCode: countryCode, otp: res.data.otp })
            }
        }
        catch (e) {
            //alert(e)
        } finally {
            setModalVisible(false)
        }

    }


    React.useEffect(() => {
        fetchToken();
    }, []);
    const fetchToken = async () => {
        const token = await getFcmToken();
        if (token) {
            Globals.DeviceToken = token;
            console.log("tokennnnnnnnnnnn", token)
        }
    };



    return {
        countryCode,
        countryFlag,
        mobileNumber,
        show,
        setCountryCode,
        setCountryFlag,
        setMobileNumber,
        setShow,
        closePicker,
        UserLogin,
        modalVisible,
        error
    };
};
