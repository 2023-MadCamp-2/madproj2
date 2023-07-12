import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HistoryRoomPage = ({ route, navigation }) => {
    const { chat } = route.params;

    // 더미 채팅 데이터
    const messages = [
        { id: 1, sender: 'me', text: '045' },
        { id: 2, sender: chat.nickname, text: '04041004' },
        { id: 3, sender: 'me', text: '129129' },
        { id: 4, sender: chat.nickname, text: '9090' },
        { id: 5, sender: 'me', text: '045' },
        { id: 6, sender: chat.nickname, text: '04041004' },
        { id: 7, sender: 'me', text: '129129' },
        { id: 8, sender: chat.nickname, text: '121212' },
        { id: 9, sender: chat.nickname, text: '9090' },
        { id: 10, sender: chat.nickname, text: '121212' },
        { id: 11, sender: chat.nickname, text: '9090' },
        { id: 12, sender: 'me', text: '121212' },
        // ... 나머지 채팅
    ];

    const [fontsLoaded] = useFonts({
        DoHyeon_400Regular,
        BlackHanSans_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={chat.image} style={styles.profileImage} />
                    <View>
                        <Text style={styles.nickname}>{chat.nickname}</Text>
                        <Text style={styles.name}>{chat.name}</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Send', { recipient: chat.nickname })}}>
                        <MaterialCommunityIcons name="microphone" size={40} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    style={styles.chatContainer}
                    contentContainerStyle={styles.chatContent}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((item, index) => (
                        <View key={index} style={[styles.messageContainer, item.sender === 'me' ? styles.myMessageContainer : styles.otherMessageContainer]}>
                            <View
                                style={[
                                    styles.message,
                                    item.sender === 'me' ? styles.myMessage : styles.otherMessage,
                                ]}
                            >
                                <Text style={styles.messageText}>{item.text}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,  
        marginTop: 60,   
        paddingVertical: 20, 
        paddingHorizontal: 20,
        width: '80%',
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowOpacity: .3,
        shadowRadius: 3,
        elevation: 3,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    headerRight: {
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: -4,
        },
        shadowOpacity: .2,
        shadowRadius: 3,
        elevation: 3,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    nickname: {
      fontSize: 19,
      fontWeight: 'bold',
      marginBottom: 5,
      fontFamily: 'DoHyeon_400Regular',
    },
    name: {
      fontSize: 16,
      color: '#888',
      fontFamily: 'DoHyeon_400Regular',
    },
    chatContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        marginHorizontal: 2.5,
    },
    chatContent:{
        paddingVertical: 30,
    },
    messageContainer: {
        marginBottom: 10,
    },
    message: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        maxWidth: '70%',
        borderRadius: 20,
    },
    myMessage: {
        backgroundColor: '#ffe6e6',
        alignSelf: 'flex-end',
        borderWidth: 3,
        borderColor: '#ffcccc',
        borderTopRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderWidth: 3,
        // borderColor: '#b3daff',
        borderColor: '#e6e6e6',
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontFamily: 'BlackHanSans_400Regular',
        fontSize: 20,
    }
});
    
      
export default HistoryRoomPage;