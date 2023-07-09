import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';

const HistoryListPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const chats = [
    { id: 1, nickname: '아기공룡둘리', name: '박진아', image: require('../../images/profile1.jpeg'), lastMessage: '586' },
    { id: 2, nickname: '검정기영이', name: '하도영', image: require('../../images/profile2.jpeg'), lastMessage: '045' },
    { id: 3, nickname: '응답했다덕선이', name: '성덕선', image: require('../../images/profile3.jpeg'), lastMessage: '8282' },
    { id: 4, nickname: '아기공룡둘리', name: '박진아', image: require('../../images/background1.jpeg'), lastMessage: '9090' },
    { id: 5, nickname: '삐삐삐삐', name: '킬크키', image: require('../../images/profile1.jpeg'), lastMessage: '0123124' },
    { id: 6, nickname: '메롱메롱', name: '진아아', image: require('../../images/profile3.jpeg'), lastMessage: '486' },
    { id: 7, nickname: '바보바보', name: '도오영', image: require('../../images/background1.jpeg'), lastMessage: '12408712' },


    // ... 나머지 채팅방
  ];

  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((item, index) => (
          <TouchableOpacity key={item.id} 
          onPress={() =>
            navigation.navigate('HistoryRoom', {
              chat: item,
            })
          }>
            <View style={[styles.card, index % 2 !== 0 ? styles.cardMarginRight : null]}>
              <View style={styles.cardTop}>
                <Image source={item.image} style={styles.cardBackground} />
                <View style={styles.overlay}>
                  <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 100,
  },
  listContainer: {
    paddingTop: 30,
    width: '80%',
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems:'center',
    borderWidth: 2,
    borderColor:'#ddd',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 3,
  },
  cardMarginRight: {
    marginRight: '2%',
  },
  cardTop:{
    position:'relative'
  },
  cardBackground:{
    width:140,
    height:140,
    resizeMode:'cover',
  },
  overlay:{
      position:'absolute',
      width:'100%',
      height:'100%',
      backgroundColor:'rgba(0,0,0,0.4)',
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
  },
  lastMessage:{
       color:'white',
       fontSize:22,
       fontFamily:'BlackHanSans',
  },
  cardBottom:{
      width:'100%',
      backgroundColor:'white',
      paddingVertical:10,
      paddingHorizontal:20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
  },
  nickname:{
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'DoHyeon'
 },
  name: {
    fontSize: 15,
    color: '#888',
    fontFamily: 'DoHyeon',  
  },
});

export default HistoryListPage;