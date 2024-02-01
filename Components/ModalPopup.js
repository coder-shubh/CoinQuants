import React from "react";
import { View, ActivityIndicator, Modal, Text, StyleSheet } from "react-native";
import Colors from "../utils/colors";
import LottieView from "lottie-react-native";
const LoaderAnimation = require('../assets/Animation - 1702207854152.json');

export default function ModalPopup({ modalVisible }) {

    return (
        <View>
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <LottieView source={LoaderAnimation} autoPlay loop style={{ height: 80, width: 500 }} />
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
        backgroundColor: 'transparent',
    },

    loadingText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    modalContainer: {
        backgroundColor: 'transparent',
        //padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modal: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 20,
        width: '40%',
        alignItems: 'center',
        alignSelf: 'center',
        top: '40%'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: '#272727',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#272727',
    },


})