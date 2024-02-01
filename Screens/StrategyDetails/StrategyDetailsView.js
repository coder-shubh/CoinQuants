// StrategyDetailsView.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../../utils/colors';
import CustomButton from '../../Components/CustomButton';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetdataFunction, PostdataFunction } from '../../utils/ApiCollection';
import Globals from '../../utils/Globals';
import ModalPopup from '../../Components/ModalPopup';

const StrategyDetailsView = ({
    navigation,
    chartData,
    strategyData,
    infoData,
    chartConfig,
    subscribed,
    onSubscribe,
    StrategyId,
    strategy_price,
    description
}) => {

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [modavisible, setModalVisible] = useState(false);
    const [setup_intent_id, setSetup_intent_id] = useState('');
    const [isSubscribed, setisSubscribed] = useState(false);







    const fetchPaymentSheetParams = async () => {
        try {
            const id = await AsyncStorage.getItem('id');

            let info =
            {
                "user_id": id,
                "strategy_id": StrategyId
            };
            console.log(info);
            setModalVisible(true);
            const res = await PostdataFunction('subscription/payment-sheet/', info);
            // console.log(":::::::::::::::::::::", res.data.data)


            const { client_secret, customer_id, ephemeral_key_secret, publishable_key, setup_intent_id, user } = res.data.data;
            return {
                paymentIntent: client_secret,
                ephemeralKey: ephemeral_key_secret,
                customer: customer_id,
                publishableKey: publishable_key,
                firstName: user.first_name,
                lastName: user.last_name,
                setup_intent_id: setup_intent_id
            };
        } catch (e) {
            alert(e);
        } finally {
            setModalVisible(false)
        }
    };


    const ConfirmPaymentApi = async (error, success) => {
        const id = await AsyncStorage.getItem('id');

        try {

            let info =
            {
                "strategy_id": StrategyId,
                "user_id": id,
                "is_success": success,
                "setup_intent_id": setup_intent_id,
                "failed_reason": error
            }
            console.log("@#######@#@@#", info);
            setModalVisible(true);
            const res = await PostdataFunction('subscription/confirm-payment/', info);
            // console.log(":::::::::::::::::::::", res.data)
            const Data = res.data.data;
            if (res.success) {
                if (Data.is_success == true) {
                    navigation.replace('PaymentSuccess', { subscription_id: Data.subscription_id, });
                } else {
                    navigation.navigate('PaymentFailed', { code: error, message: Data.failed_reason })
                }
            } else {
                navigation.navigate('PaymentFailed', { code: error, message: error })
            }
        } catch (e) {
            alert(e);
        } finally {
            setModalVisible(false)
        }
    };


    const initializePaymentSheet = async () => {
        try {
            const {
                paymentIntent,
                ephemeralKey,
                customer,
                publishableKey,
                firstName,
                lastName,
                setup_intent_id
            } = await fetchPaymentSheetParams();

            setSetup_intent_id(setup_intent_id);
            const { error } = await initPaymentSheet({
                merchantDisplayName: "CoinQuant",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                setupIntentClientSecret: paymentIntent,
                googlePay: {
                    merchantCountryCode: 'US',
                    currencyCode: 'USD', // currency must be specified for setup mode
                    testEnv: true, // use test environment
                },
                // allowsDelayedPaymentMethods: true,
                // applePay: true,
                // googlePay: true,
                // defaultBillingDetails: {
                //     name: firstName + ' ' + lastName,
                // }

            });

            if (error) {
                console.log("initialize Paymentttttttttttttt", error)
            }
        } catch (e) {
            alert(e)
        }
    };

    const openPaymentSheet = async () => {
        try {
            const { error } = await presentPaymentSheet();
            console.log(error)

            if (error) {
                // Alert.alert(`Error code: ${error.code}`, error.message);
                ConfirmPaymentApi(error.message, false)


            } else {
                // Alert.alert('Success', 'Your order is confirmed!');
                ConfirmPaymentApi("", true)
            }
        } catch (e) {
            alert(e);
            // console.log(e);
        }
    };

    useEffect(() => {
        initializePaymentSheet();
        getStrategyById();
    }, []);





    async function getStrategyById() {

        try {
            const result = await GetdataFunction('strategy/user/' + StrategyId + '/check/');
            console.log("#$#$#$#$#$#$3", result)
            if (result.success) {
                const Data = result.data.data;
                console.log("#$#$#$#$#$#$3", Data)
                setisSubscribed(Data.subscribed)
            }
        }
        catch (e) {
            alert(e)
        }
        finally {
            setModalVisible(false);
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.Secondary_theme }}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <ModalPopup modalVisible={modavisible} />

            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 16, color: Colors.textColor, fontFamily: 'AnekBangla-Medium' }}>
                    {strategyData.title}
                </Text>
                <Text style={{ fontSize: 32, color: Colors.textColor }}>{strategyData.price}</Text>
                <Text style={{ fontSize: 16, color: '#68FF32', fontFamily: 'AnekBangla-Medium' }}>
                    {strategyData.percentageChange}
                </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
                <LineChart data={chartData} width={370} height={250} verticalLabelRotation={0} chartConfig={chartConfig} bezier />
            </View>
            <View style={{ margin: 15, bottom: 10 }}>
                <Text style={{ fontSize: 20, color: Colors.textColor, fontFamily: 'AnekBangla-Medium' }}>{infoData.title}</Text>
                <Text style={{ fontSize: 14, color: '#808080', fontFamily: 'AnekBangla-Regular' }}>{description}</Text>
            </View>
            <View style={{ height: 1, width: '90%', backgroundColor: '#808080', alignSelf: 'center' }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Image style={{ height: 40, width: 40 }} resizeMode='contain' source={require('../../assets/done.png')} />
                <Text style={{ fontSize: 14, color: Colors.textColor, fontFamily: 'AnekBangla-Medium', width: '80%' }}>
                    A defined entry and exit strategy.{'  '}
                    <Text style={{ fontFamily: 'AnekBangla-Regular', fontSize: 14, color: '#808080' }}>
                        Entering and exiting a trade is based on how the market interprets the news.
                    </Text>
                </Text>
            </View>

            <View style={{ width: '100%', marginTop: 20, paddingBottom: '20%' }}>
                <CustomButton text={isSubscribed == true ? 'Subscribed' : 'Subscribe @ $' + strategy_price + '/month'} Press={() => { openPaymentSheet() }} disable={isSubscribed} color={isSubscribed == true ? '#808080' : Colors.buttonPrimaryColor} />
            </View>
        </ScrollView>
    );
};

export default StrategyDetailsView;
