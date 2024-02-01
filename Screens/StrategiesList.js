import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView, Dimensions, RefreshControl, Platform } from 'react-native';
import Colors from "../utils/colors";
import CustomButton from "../Components/CustomButton";
import CustomHeader from "../Components/CustomHeader";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Globals from "../utils/Globals";
import { DeletedataFunction, GetdataFunction } from "../utils/ApiCollection";
import ModalPopup from "../Components/ModalPopup";
import ErrorPopup from "../Components/ErrorPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get('window');

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
        {
            data: [10, 15, 20, 30],
            color: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
            strokeWidth: 4,
        },
    ],
};

export default function StrategiesList({ navigation }) {

    const [focus, setFocus] = useState(1);
    const refRBSheet = React.useRef();
    const refCoinSheet = React.useRef();
    const refSheet = React.useRef();
    const refSheetSort = React.useRef();
    const refConnectSheet = React.useRef();
    const [CoinList, setCoinList] = useState([]);
    const [Coin, setCoin] = useState('');
    const [StrategyList, setStrategyList] = useState([]);
    const [Stategy, setStategy] = useState('');
    const [connnection, setConnnection] = useState('Connect');
    const [selectedValue, setSelectedValue] = useState('option1');
    const [appliedFilter, setAppliedFilter] = useState('PNL');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [balance, setBalance] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const memoizedGetStrategy = useCallback(() => getStrategy(), []);
    const memoizedGetStripeKey = useCallback(() => getStripeKey(), []);
    // const memoizedGetUser = useCallback(() => getUser(), []);
    const [userData, setUserData] = useState(null);


    const toggleConnection = () => {
        if (connnection === 'Connect') {
            // setConnnection('Disconnect');
            navigation.navigate('ConnectWallet');
        } else {
            // setConnnection('Connect');
            DisconnectWallet()
        }
        refConnectSheet.current.close();
    };
    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);

            // Fetch new stories
            await getUser();

        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);


    function OpenMenu() {
        refRBSheet.current.open();
    }



    function ConnectMenu() {
        refConnectSheet.current.open();
    }

    function CloseMenu() {
        refRBSheet.current.close();
    }


    function CloseCoinMenu(item) {
        setCoin(item)
        refCoinSheet.current.close();
    }

    function CloseStrategyMenu(item) {
        setStategy(item)
        refSheet.current.close();
    }


    const renderStategyList = ({ item }) => {
        return (
            <TouchableOpacity style={{ alignItems: "center", padding: 10 }} onPress={() => { CloseStrategyMenu(item) }}>
                <Text style={{ color: Colors.textColor }}>Coin 1</Text>
            </TouchableOpacity>
        )
    }


    const renderCoinList = ({ item }) => {
        return (
            <TouchableOpacity style={{ alignItems: "center", padding: 10 }} onPress={() => { CloseCoinMenu(item) }}>
                <Text style={{ color: Colors.textColor }}>Coin 1</Text>
            </TouchableOpacity>
        )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader />
        });
    }, [navigation]);


    const renderList = ({ item }) => {

        const listItemWidth = width * 0.9;

        return (
            <TouchableOpacity style={{ backgroundColor: '#18087B', width: listItemWidth, borderRadius: 5, flexDirection: "row", minHeight: 60, marginTop: 10, alignItems: "center" }} activeOpacity={0.5} onPress={() => { navigation.navigate('StrategyDetails', { StrategyId: item.id, bot_title: item.title, strategy_price: item.cost_per_month, description: item.description }) }}>
                <View style={{ width: '40%', left: 10 }}>
                    <Text style={{ fontSize: 20, color: Colors.textColor, fontFamily: 'AnekBangla-Medium', }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, color: '#808080', fontFamily: 'AnekBangla-Regular', }}>${item.cost_per_month} per month</Text>
                </View>

                <View style={{ backgroundColor: '#FFB93357', width: '25%', height: '40%', borderRadius: 40, margin: 3, left: 20, alignItems: 'center', justifyContent: "center", bottom: 5 }}>
                    <Text style={{ fontSize: 10, color: Colors.buttonPrimaryColor, fontFamily: 'AnekBangla-Medium' }}>{item.type}</Text>
                </View>

                <View style={{ alignItems: "center", left: 40, }}>
                    <Text style={{ fontSize: 14, color: Colors.textColor, fontFamily: 'AnekBangla-Medium' }}>71.07%</Text>
                    <Text style={{ fontSize: 16, color: '#68FF32', fontFamily: 'AnekBangla-Regular' }}>+ 06,54%</Text>
                </View>


            </TouchableOpacity>
        )
    }


    const renderTrackList = ({ item }) => {


        return (
            <View style={{ backgroundColor: '#18087B', width: 350, borderRadius: 5, flexDirection: "row", height: 200, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: Colors.textColor }}>Connect to exchange</Text>
            </View>
        )
    }


    useEffect(() => {
        memoizedGetStrategy();
        memoizedGetStripeKey();
    }, [memoizedGetStrategy, memoizedGetStripeKey]);




    async function getStrategy() {

        try {
            setModalVisible(true);
            const result = await GetdataFunction('strategy/');

            // console.log('4555555555555555555555555555', result.data.data)

            if (result.success) {
                const Data = result.data.data;
                setStrategyList(Data.results);
            }
        }
        catch (e) {
            setErrorVisible(true);
            setErrorMessage(e);
        }
        finally {
            setModalVisible(false);
        }
    }

    async function getStripeKey() {

        try {
            setModalVisible(true);
            const result = await GetdataFunction('key-settings/stripe/');
            // console.log("RERERERERERER", result.data.data)
            if (result.success) {
                const Data = result.data.data;
                Globals.publishable_key = Data.publishable_key;
                Globals.secret_key = Data.secret_key
            }
        }
        catch (e) {
            setErrorVisible(true);
            setErrorMessage(e);
        }
        finally {
            setModalVisible(false);
        }
    }

    const closeErrorPopup = () => {
        setErrorVisible(false);
    };

    const sortList = (order) => {
        const sortedList = [...StrategyList].sort((a, b) => {
            const costA = a.cost_per_month;
            const costB = b.cost_per_month;
            return order === 'asc' ? costA - costB : costB - costA;
        });

        setStrategyList(sortedList);
        setSortOrder(order);
    };

    const handleAscendingSortPress = () => {
        sortList('asc');
    };

    const handleDescendingSortPress = () => {
        sortList('desc');
    };



    const getUser = useCallback(async () => {
        setModalVisible(true);
        try {
            const id = await AsyncStorage.getItem('id');
            if (id && !userData) {
                const userProfileData = await getUserProfile(id);
                setUserData(userProfileData);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setModalVisible(false);
        }
    }, [userData]);

    const getUserProfile = useCallback(async (id) => {
        try {
            const result = await GetdataFunction('user/' + id + '/profile/');

            if (result.success) {
                const userProfileData = result.data.data;
                if (userProfileData.binance_profile) {
                    setConnnection('Disconnect');
                    const balanceResult = await GetdataFunction('user/binance/balance/');
                    if (balanceResult.success) {
                        const balanceData = balanceResult.data.data;
                        if (balanceData.balance) {
                            setBalance(balanceData.balance);
                            if (Globals.balance) {
                                Globals.balance = balanceData.balance;
                            } else {
                                Globals.balance = '0.00';
                            }
                        }
                    }
                }
                return userProfileData;
            }
        } catch (e) {
            alert(e);
        } finally {
            setModalVisible(false);
        }
    }, []);


    return (

        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: Colors.Secondary_theme, }}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
            <ErrorPopup
                visible={errorVisible}
                errorMessage={errorMessage}
                onClose={closeErrorPopup}
            />
            <Image style={{ height: 150, width: 150, position: "absolute", left: -34, }} resizeMode="contain" source={require('../assets/Ellipse2.png')} />


            <Image style={{ height: 150, width: 150, position: "absolute", right: -30, top: 40 }} resizeMode="contain" source={require('../assets/Ellipse1.png')} />
            <ModalPopup modalVisible={modalVisible} />


            <ScrollView style={{ width: '100%', marginTop: Platform.OS === 'ios' ? 30 : 0 }} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#009387']}
                    tintColor={'#009387'}
                />
            }>
                <View style={{ alignItems: "center", width: '100%', }}>
                    <View style={{ height: 180, width: 180, borderRadius: 100, backgroundColor: '#18087B', borderWidth: 4, borderColor: Colors.buttonPrimaryColor, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontFamily: 'AnekBangla-Medium', color: Colors.textColor }}>My Balance</Text>
                        <Text style={{ fontSize: 40, fontFamily: 'AnekBangla-Medium', color: Colors.textColor }}>${balance ? balance : Globals.balance}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '60%', alignSelf: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: 'AnekBangla-Medium', color: Colors.LeftbalanceColor }}>$0.00</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'AnekBangla-Medium', color: Colors.SentbalanceColor }}>$0.00%</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, width: '100%' }} >
                        <CustomButton text={connnection} Press={() => { ConnectMenu() }} />
                    </View>


                    {connnection === 'Disconnect' &&
                        <View style={{ height: 340, width: '90%', backgroundColor: Colors.primary_theme_background, borderRadius: 10, marginTop: 20, padding: 5 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, fontFamily: 'AnekBangla-Medium', color: Colors.textColor }}>Strategy Name</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '22%', alignItems: "center" }}>
                                    <Text style={{ color: '#808080', fontFamily: 'AnekBangla-Regular' }}>PNL</Text>
                                    <TouchableOpacity style={{ height: '80%', width: 45, borderRadius: 20, backgroundColor: '#808080', flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}
                                        activeOpacity={0.7}>
                                        <Text style={{ fontSize: 10, fontFamily: 'AnekBangla-Regular', color: Colors.textColor }}>24h</Text>
                                        <AntDesign name="chevron-small-down" size={13} color={Colors.textColor} />

                                    </TouchableOpacity>

                                </View>
                            </View>



                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', width: '22%', alignItems: "center" }} onPress={() => { navigation.navigate('Setting') }} activeOpacity={0.5}>
                                    <Icons name="settings" size={18} color={Colors.buttonPrimaryColor} />
                                    <Text style={{ fontSize: 14, fontFamily: 'AnekBangla-Regular', color: Colors.buttonPrimaryColor }}>Settings</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#68FF32', fontFamily: 'AnekBangla-Medium', fontSize: 18 }}>+00,00%</Text>
                            </View>

                            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                                <LineChart
                                    data={data}
                                    width={340}
                                    height={180}
                                    verticalLabelRotation={0}
                                    chartConfig={chartConfig}
                                    bezier
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 15, justifyContent: 'space-between', width: '95%', alignSelf: "center" }}>
                                <TouchableOpacity style={{ height: 40, width: '40%', borderRadius: 5, borderWidth: 1, borderColor: '#24FF00', alignItems: "center", justifyContent: "center" }} activeOpacity={0.5}>
                                    <Text style={{ color: '#24FF00', fontSize: 14, fontFamily: 'Inter-Medium' }}>Start</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ height: 40, width: '40%', borderRadius: 5, borderWidth: 1, borderColor: '#FF4C40', alignItems: "center", justifyContent: "center" }} activeOpacity={0.5}>
                                    <Text style={{ color: '#FF4C40', fontSize: 14, fontFamily: 'Inter-Medium' }}>Stop</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    }
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", width: '100%', marginTop: 40 }}>

                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { setFocus(1) }} activeOpacity={0.8}>
                            <Text style={{ color: focus == 1 ? '#fff' : '#808080', fontFamily: 'AnekBangla-Regular', fontSize: 16 }}>Best Strategies</Text>
                            <View style={{ height: focus == 1 ? 2 : 1, backgroundColor: focus == 1 ? Colors.buttonPrimaryColor : '#808080', width: 150, marginTop: 20 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center", }} onPress={() => { setFocus(2) }} activeOpacity={0.8}>
                            <Text style={{ color: focus == 2 ? '#fff' : '#808080', fontFamily: 'AnekBangla-Regular', fontSize: 16 }}>Latest Trades</Text>
                            <View style={{ height: focus == 2 ? 2 : 1, backgroundColor: focus == 2 ? Colors.buttonPrimaryColor : '#808080', width: 150, marginTop: 20 }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", width: '50%', margintop: 10, right: 30, alignItems: "center", paddingTop: 10 }}>

                        <TouchableOpacity style={{ height: 25, width: 25, alignItems: "center", alignSelf: "center", flexDirection: "row", right: 20 }} activeOpacity={0.5}>
                            <AntDesign name="chevron-small-up" size={20} color="#fff" onPress={() => {
                                handleAscendingSortPress();
                                console.log('asc')
                            }} />
                            <AntDesign name="chevron-small-down" size={20} color="#fff" onPress={() => {
                                handleDescendingSortPress();
                                console.log('dsc')
                            }} />
                        </TouchableOpacity>
                        <Text style={{ color: Colors.textColor }}>{appliedFilter}</Text>
                        <TouchableOpacity style={{ height: 25, width: 25, alignItems: "center", alignSelf: "center" }} activeOpacity={0.5} onPress={() => {
                            refSheetSort.current.open();
                        }}>
                            <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={require('../assets/sort.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 25, width: 25, alignItems: "center", alignSelf: "center" }} activeOpacity={0.5} onPress={() => { OpenMenu() }}>
                            <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={require('../assets/filter.png')} />
                        </TouchableOpacity>


                    </View>
                    {focus == 1 &&
                        <View style={{ marginTop: 20, width: '100%', alignSelf: "center", alignItems: "center" }}>
                            <FlatList
                                data={StrategyList}
                                renderItem={renderList}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                    }


                    {focus == 2 &&
                        <View style={{ marginTop: 20, width: '100%', alignSelf: "center", alignItems: "center" }}>
                            <FlatList
                                data={[1]}
                                renderItem={renderTrackList}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                    }




                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: 'transparent'
                            },
                            draggableIcon: {
                                backgroundColor: Colors.bottomsheetColor
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                                backgroundColor: Colors.bottomsheetColor,
                            }
                        }}
                        height={380}
                    >
                        <View style={{ width: '90%', alignSelf: "center" }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%', alignItems: "center", alignSelf: "center" }}>
                                <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Medium' }}>Filters</Text>
                                <Icon name="window-close" size={20} color="#fff" onPress={() => {
                                    refRBSheet.current.close();
                                }} />
                            </View>
                            <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Regular', marginTop: 10 }}>Coin</Text>
                            <TouchableOpacity style={{ height: 50, width: '100%', borderWidth: 0.5, borderColor: '#5141B8', borderRadius: 5, marginTop: 5, padding: 10, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                // refCoinSheet.current.open() 
                            }}>
                                <Text style={{ color: '#9E9E9E' }}>{Coin}</Text>
                                <Icon name="chevron-down" size={20} color="#9E9E9E" />
                            </TouchableOpacity>
                            <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Regular', marginTop: 10 }}>Strategy type</Text>
                            <TouchableOpacity style={{ height: 50, width: '100%', borderWidth: 0.5, borderColor: '#5141B8', borderRadius: 5, marginTop: 5, padding: 10, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                // refSheet.current.open() 
                            }}>
                                <Text style={{ color: '#9E9E9E' }}>{Stategy}</Text>
                                <Icon name="chevron-down" size={20} color="#9E9E9E" />
                            </TouchableOpacity>
                            <View style={{ marginTop: 30 }}>
                                <CustomButton text={'Apply'} width={'100%'} Press={() => { CloseMenu() }} />
                            </View>
                        </View>
                    </RBSheet>


                    <RBSheet
                        ref={refCoinSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: 'transparent'
                            },
                            draggableIcon: {
                                backgroundColor: Colors.bottomsheetColor
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                                backgroundColor: Colors.bottomsheetColor,
                            }
                        }}
                        height={300}
                    >
                        <FlatList
                            data={[1, 1, 1, 1, 1]}
                            renderItem={renderCoinList}
                            keyExtractor={(item, index) => { index.toString() }} />

                    </RBSheet>


                    <RBSheet
                        ref={refSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: 'transparent'
                            },
                            draggableIcon: {
                                backgroundColor: Colors.bottomsheetColor
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                                backgroundColor: Colors.bottomsheetColor,
                            }
                        }}
                        height={300}
                    >

                        <FlatList
                            data={[1, 1, 1, 1, 1]}
                            renderItem={renderStategyList}
                            keyExtractor={(item, index) => { index.toString() }} />


                    </RBSheet>



                    <RBSheet
                        ref={refConnectSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: 'transparent'
                            },
                            draggableIcon: {
                                backgroundColor: Colors.bottomsheetColor
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                                backgroundColor: Colors.bottomsheetColor,
                            }
                        }}
                        height={250}
                    >
                        <View style={{ width: '90%', alignSelf: "center" }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%', alignItems: "center", alignSelf: "center" }}>
                                <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Medium' }}>{connnection}</Text>
                                <Icon name="window-close" size={20} color="#fff" onPress={() => {
                                    refConnectSheet.current.close();
                                }} />
                            </View>
                            <Text style={{ color: Colors.textColor, fontSize: 18, fontFamily: 'Rubik-Regular', marginTop: 15 }}>Do you really wanted to {connnection} your account?</Text>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                                <TouchableOpacity style={{ height: 60, width: '40%', borderColor: Colors.buttonPrimaryColor, borderWidth: 2, justifyContent: "center", alignItems: "center", borderRadius: 5 }} onPress={() => toggleConnection()}>
                                    <Text style={{ color: Colors.buttonPrimaryColor, fontSize: 20, fontFamily: 'AnekBangla-Medium' }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 60, width: '40%', backgroundColor: Colors.buttonPrimaryColor, justifyContent: "center", alignItems: "center", borderRadius: 5 }} onPress={() => { refConnectSheet.current.close(); }}>
                                    <Text style={{ color: Colors.bottomsheetColor, fontSize: 20, fontFamily: 'AnekBangla-Medium' }}>No</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </RBSheet>


                    <RBSheet
                        ref={refSheetSort}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: 'transparent'
                            },
                            draggableIcon: {
                                backgroundColor: Colors.bottomsheetColor
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                                backgroundColor: Colors.bottomsheetColor,
                            }
                        }}
                        height={360}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '95%', alignItems: "center", alignSelf: "center" }}>
                            <Text style={{ color: Colors.textColor, fontSize: 20, fontFamily: 'AnekBangla-Medium' }}>Sort by</Text>
                            <Icon name="window-close" size={20} color="#fff" onPress={() => {
                                refSheetSort.current.close();
                            }} />
                        </View>
                        <View style={{ marginTop: 10 }}>

                            <TouchableOpacity style={styles.radioButton} onPress={() => { setSelectedValue('option3'); setAppliedFilter('Winrate') }}>
                                <RadioButton.Android
                                    value="option3"
                                    status={selectedValue === 'option3' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option3')}
                                    color={Colors.buttonPrimaryColor}
                                />
                                <Text style={styles.radioLabel}>
                                    Winrate
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.radioButton} onPress={() => { setSelectedValue('option4'); setAppliedFilter('PNL%') }}>
                                <RadioButton.Android
                                    value="option4"
                                    status={selectedValue === 'option4' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option4')}
                                    color={Colors.buttonPrimaryColor}
                                />
                                <Text style={styles.radioLabel}>
                                    PNL%
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.radioButton} onPress={() => { setSelectedValue('option5'); setAppliedFilter('Profit Ratio') }}>
                                <RadioButton.Android
                                    value="option5"
                                    status={selectedValue === 'option5' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option5')}
                                    color={Colors.buttonPrimaryColor}
                                />
                                <Text style={styles.radioLabel}>
                                    Profit Ratio
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.radioButton} onPress={() => { setSelectedValue('option6'); setAppliedFilter('Max Draw Down') }}>
                                <RadioButton.Android
                                    value="option6"
                                    status={selectedValue === 'option6' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option6')}
                                    color={Colors.buttonPrimaryColor}
                                />
                                <Text style={styles.radioLabel}>
                                    Max Draw Down
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.radioButton} onPress={() => { setSelectedValue('option7'); setAppliedFilter('Sharp Ratio') }}>
                                <RadioButton.Android
                                    value="option7"
                                    status={selectedValue === 'option7' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option7')}
                                    color={Colors.buttonPrimaryColor}
                                />
                                <Text style={styles.radioLabel}>
                                    Sharp Ratio
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '95%', bottom: '10%', alignSelf: 'center', position: 'absolute' }}>
                            <CustomButton text={'Apply'} width={'100%'} Press={() => {
                                refSheetSort.current.close();

                            }} />
                        </View>


                    </RBSheet>

                </View>
                <View style={{ height: 100 }} />
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 20,
        color: Colors.textColor,
        fontFamily: 'AnekBangla-Regular'
    },
})



const chartConfig = {
    backgroundGradientFrom: Colors.Secondary_theme,
    backgroundGradientTo: Colors.Secondary_theme,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 4,
    propsForDots: {
        r: '6',
        strokeWidth: '1',
        stroke: 'rgba(255, 255, 255, 1)',
    },
};