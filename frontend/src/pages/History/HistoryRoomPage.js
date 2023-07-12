import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const HistoryRoomPage = ({ route, navigation }) => {
    const { chat } = route.params;

    const [fontsLoaded] = useFonts({
        DoHyeon_400Regular,
        BlackHanSans_400Regular,
    });

    const [messages, setMessages] = useState([]);
    useEffect(() => {
      AsyncStorage.getItem('myNickname')
        .then(myNickname => {
            console.log(myNickname);
        fetch(`${API_URL}/chat?from=${myNickname}&to=${chat.nickname}`)
            .then(response => response.json())
            .then(data => {
            const messages = data.map(item => ({
                id: item._id,
                sender: item.from === myNickname ? 'me' : chat.nickname,
                text: item.message
            }));
            setMessages(messages);
            });
        });
    }, []);

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
        backgroundColor: '#4E944F',
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
        marginTop: '30%'
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
        marginTop: '5%',
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
        backgroundColor: '#ffcccc',
        alignSelf: 'flex-end',
        borderWidth: 3,
        borderColor: '#ffcccc',
        borderTopRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: '#f0d586',
        alignSelf: 'flex-start',
        borderWidth: 3,
        borderColor: '#f0d586',
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontFamily: 'BlackHanSans_400Regular',
        fontSize: 20,
    }
});
    
      
export default HistoryRoomPage;