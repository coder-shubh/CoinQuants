import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView, Dimensions, RefreshControl, Platform } from 'react-native';
import Colors from "../utils/colors";
import CustomHeader from "../Components/CustomHeader";
import Globals from "../utils/Globals";
import { GetdataFunction } from "../utils/ApiCollection";
import ModalPopup from "../Components/ModalPopup";



const { width } = Dimensions.get('window');

export default function StrategiesList({ navigation }) {

    const [StrategyList, setStrategyList] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const memoizedGetStrategy = useCallback(() => getStrategy(), []);
    const memoizedGetStripeKey = useCallback(() => getStripeKey(), []);


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
            alert(e);
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
            alert(e);
        }
        finally {
            setModalVisible(false);
        }
    }




    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary_theme} />
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

                    <View style={{ marginTop: 20, width: '100%', alignSelf: "center", alignItems: "center" }}>
                        <FlatList
                            data={StrategyList}
                            renderItem={renderList}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.Secondary_theme,
    },
})
