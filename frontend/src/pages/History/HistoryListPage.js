import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryListPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
    fetchChats();
  }, []);


  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const dispatch = useDispatch();
  const images = useSelector(state => state.images);

  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const nickname = await AsyncStorage.getItem('myNickname');
  
      const response = await fetch(`${API_URL}/history/${nickname}`);
      const data = await response.json();
      console.log(data);
  
      const chats = await Promise.all(data.map(async (item, index) => {
        // 백엔드 API 호출하여 유저의 이름 검색
        const response = await fetch(`${API_URL}/auth/user?nickname=${item.user}`);
        const userData = await response.json();
        const name = userData.name;
  
        if (!images[item.user]) {
          // 이미지가 null인 경우에만 랜덤 이미지를 할당
          
          const images = [
            require('../../images/profile1.jpeg'),
            require('../../images/profile2.jpeg'),
            require('../../images/profile3.jpeg'),
            require('../../images/profile5.jpg'),
            require('../../images/profile6.jpg'),
            require('../../images/profile7.jpg'),
            require('../../images/profile8.jpg'),
            require('../../images/profile9.jpg'),
            require('../../images/profile10.jpg'),
            require('../../images/profile11.jpg'),
            require('../../images/profile12.jpg'),
            require('../../images/profile13.png'),
            require('../../images/profile14.jpg'),
            require('../../images/profile16.png'),
            require('../../images/background1.jpeg')
          ];
          // 랜덤 이미지를 할당하고, Redux 스토어에 저장
          const image = images[Math.floor(Math.random() * images.length)];
          dispatch({ type: 'SET_IMAGE', nickname: item.user, image });
          return {
            id: index,
            nickname: item.user,
            name,
            image,
            lastMessage: item.lastMessage.message
          };
        } else {
          // 이미지가 이미 할당된 경우는 기존 이미지 유지
          return {
            id: index,
            nickname: item.user,
            name,
            image: images[item.user],
            lastMessage: item.lastMessage.message
          };
        }
      }));
  
      setChats(chats);
    } catch (error) {
      console.error('채팅방 데이터 가져오기 에러:', error);
    }
  };  
  

  console.log('채팅방 목록:', chats);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{...styles.listContent, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((item, index) => (
          <TouchableOpacity key={index} 
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
    width: '90%',
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems:'center',
    borderWidth:1,
    borderColor:'#ddd',
    marginHorizontal: 9,
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
       fontSize:15,
       fontFamily:'DoHyeon'
  },
  cardBottom:{
      backgroundColor:'white',
      paddingVertical:10,
      paddingHorizontal:10,
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