import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, FlatList, View } from "react-native";
import Colors from "../utils/colors";
import Globals from "../utils/Globals";


const { width } = Dimensions.get('window');


export default function StrategyModal({ modalVisible, data, onClose, onData }) {


    const renderitem = ({ item, index }) => {
        const listItemWidth = width * 0.9;
        return (
            <TouchableOpacity style={{ width: listItemWidth, justifyContent: "center", alignItems: "center", height: 50, alignSelf: "center", borderBottomWidth: 1, backgroundColor: Colors.primary_theme_background }} activeOpacity={0.8} onPress={() => { onData(item.id) }}>
                <Text style={styles.title}>{item.strategy.bot_title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <FlatList data={data}
                            renderItem={renderitem}
                            keyExtractor={(index) => index.toString()} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    Modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    loadingText: {
        color: '#333',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        alignSelf: "center",
    },
    modal: {
        backgroundColor: Colors.Secondary_theme,
        borderRadius: 10,
        padding: 20,
        width: '95%',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 40,
        top: '15%',
        height: '75%'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: Colors.white,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#272727',
    },


})
