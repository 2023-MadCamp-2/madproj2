import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts,  DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';

const ReceiveModal = ({ from, message, onClose }) => {

    const [fontsLoaded] = useFonts({
        'DoHyeon' : DoHyeon_400Regular,
        'BlackHanSans' : BlackHanSans_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Modal transparent={true} animationType="fade">
        <View style={styles.container}>
            <View style={styles.pagerContainer}>
            <Text style={styles.fromText}>From: {from}</Text>
            <View style={styles.pager}>
                
                <View style={styles.pagerScreen}>
                <Text style={styles.pagerText}>{message}</Text>
                </View>
                <View style={styles.pagerButtons}>
                    <TouchableOpacity style={styles.pagerButton} />
                    <Text style={{color: '#fff',fontFamily: 'DoHyeon', fontSize: 18}}onPress={onClose}> 닫기</Text>
                    <TouchableOpacity style={styles.pagerButton} />
                </View>
                
            </View>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    pagerContainer: {
        width: '70%',
        height: '28%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .5,
        shadowRadius: 3,
        elevation: 10,
    },
    pager: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagerScreen: {
        width: '70%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagerText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'BlackHanSans',
        paddingHorizontal: 10,
        color: '#000',
    },
    fromText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'DoHyeon',
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000',
    },
    pagerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 15,
    },
    pagerButton: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    pagerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'BlackHanSans'
    },
});

export default ReceiveModal;