// PaymentSuccessViewModel.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetdataFunction } from "../../utils/ApiCollection";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const PaymentSuccessViewModel = (subscription_id) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const timestamp = new Date().toISOString();

    useEffect(() => {
        getUser();
    }, []);


    async function getUser() {
        setModalVisible(true);
        try {
            const id = await AsyncStorage.getItem('id');
            if (id) {

                const result = await GetdataFunction('user/' + id + '/profile/');
                if (result.success) {
                    const Data = result.data.data;
                    setEmail(Data.email);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setModalVisible(false);
        }
    }





    return {
        title: 'Order Confirmation',
        message: 'Payment Successful',
        orderNumber: 'Your order ' + subscription_id + ' has been placed.',
        emailMessage: 'We sent an email to ' + email + ' with your order confirmation and bill.',
        timestamp: 'Time placed: ' + timestamp,
        modalVisible,

    };
};

export default PaymentSuccessViewModel;
