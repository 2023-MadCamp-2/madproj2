import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts,  DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';

const CustomAlert = ({ isVisible, message, onClose }) => {

    const [fontsLoaded] = useFonts({
        'DoHyeon' : DoHyeon_400Regular,
        'BlackHanSans' : BlackHanSans_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>

            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
    };

    const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 5,
        height: 5
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'DoHyeon',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'DoHyeon',
        fontSize: 18,
    }
});

export default CustomAlert;
