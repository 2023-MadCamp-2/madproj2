import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const MyPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);
  
  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const dispatch = useDispatch();
  const images = useSelector(state => state.images);

  const [selectedSound, setSelectedSound] = useState('sound1');
  const [myName, setMyname] = useState('');

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('myNickname');
      if (value !== null && value !== undefined) {
        setMyname(value);
        console.log('내 닉네임1:', value);
      }
    };
    getData();
  }, []);
  
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    profileImage: null,
    backgroundImage: require('../../images/background3.png'),
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('내 닉네임2:', myName);
        const response = await fetch(`${API_URL}/auth/user?nickname=${myName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(user => ({
            ...user,
            nickname: myName,
            name: data.name,
            profileImage: images[myName] || require('../../images/profile1.jpeg'),
          }));
        } else {
          console.log('회원 정보 불러오기 실패');
        }
      } catch (error) {
        console.error('회원 정보 불러오기 에러:', error);
      }
    };
  
    fetchUser();
  }, [myName]);

  useEffect(() => {
    if (!user.profileImage) {
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
      dispatch({ type: 'SET_IMAGE', nickname: user.nickname, image });
      setUser(user => ({ ...user, profileImage: image }));
    }
  }, []);

  const handleUpdateProfileImage = () => {
    // 랜덤 이미지를 할당
    const images = [
      require('../../images/profile1.jpeg'),
      require('../../images/profile2.jpeg'),
      require('../../images/profile3.jpeg'),
      require('../../images/background1.jpeg')
    ];
    const image = images[Math.floor(Math.random() * images.length)];

    // 이미지 정보 업데이트
    dispatch({ type: 'SET_IMAGE', nickname: user.nickname, image });
    setUser(user => ({ ...user, profileImage: image }));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={user.backgroundImage} style={styles.backgroundImage} />
      <View style={styles.profileSection}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <TouchableOpacity onPress={handleUpdateProfileImage}>
          <Text style={{fontSize: 30, padding: 5}}>🎲</Text>
        </TouchableOpacity>
        <View style={styles.nicknameContainer}>
            <Text style={styles.nickname}>{user.nickname}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 100,
  },
  backgroundImage: {
    width: '100%',
    height: '45%',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: -110,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#fff',
  },
  saveButtonText : {
    color: '#318bfb',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'DoHyeon',
  },
  name: {
    fontSize: 22,
    color: '#888',
    fontFamily: 'DoHyeon',
  },
  settingsSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  settingTitle: {
    fontFamily: 'BlackHanSans',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
});

export default MyPage;