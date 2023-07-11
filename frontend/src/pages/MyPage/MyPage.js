import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [editingNickname, setEditingNickname] = useState(false);
  const [myName, setMyname] = useState('');

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('myNickname');
      if (value !== null && value !== undefined) {
        setMyname(value);
      }
    };
    getData();
  }, []);
  
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    profileImage: null,
    backgroundImage: require('../../images/background1.jpeg'),
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('내 닉네임:', myName);
        const response = await fetch(`http://172.10.5.132:443/auth/user?nickname=${myName}`, {
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
            profileImage: images[myName],
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
        require('../../images/background1.jpeg')
      ];
      // 랜덤 이미지를 할당하고, Redux 스토어에 저장
      const image = images[Math.floor(Math.random() * images.length)];
      dispatch({ type: 'SET_IMAGE', nickname: user.nickname, image });
      setUser(user => ({ ...user, profileImage: image }));
    }
  }, []);
  
  const sounds = [
    { label: '소리 1', value: 'sound1' },
    { label: '소리 2', value: 'sound2' },
    { label: '소리 3', value: 'sound3' },
  ];

  const handleUpdateNickname = text => {
    setUser(user => ({ ...user, nickname: text }));
  };

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
      <View style={styles.settingsSection}>
        <Text style={styles.settingTitle}>🔔 삐삐 알람소리 🔔</Text>
        <Picker
          selectedValue={selectedSound}
          onValueChange={itemValue => setSelectedSound(itemValue)}
          style={styles.picker}
          itemStyle={{ fontFamily: 'DoHyeon', fontSize:22 }}
        >
          {sounds.map(sound => (
            <Picker.Item  key={sound.value} label={sound.label} value={sound.value} />
          ))}
        </Picker>
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
    height: 200,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: -70,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'white',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'DoHyeon',
  },
  name: {
    fontSize: 25,
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
  picker: {
    height: 50,
    width: '50%',
  },
});

export default MyPage;


// 실제 음성파일 버전
// import React from 'react';
// import { useEffect, useState, useContext } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';
// import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
// import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
// import { Audio } from 'expo-av';

// const MyPage = ({ navigation }) => {
//   useEffect(() => {
//     navigation.setOptions({ headerShown: false }); // 헤더를 숨김
//   }, []);
  
//   const [fontsLoaded] = useFonts({
//     'BlackHanSans': BlackHanSans_400Regular,
//     'DoHyeon': DoHyeon_400Regular,
//   });

//   const [selectedSound, setSelectedSound] = useState('sound1');
//   const [editingNickname, setEditingNickname] = useState(false);

//   const [user, setUser] = useState({
//     nickname: '아기공룡둘리',
//     name: '박진아',
//     profileImage: require('../../images/profile1.jpeg'),
//     backgroundImage: require('../../images/background1.jpeg'),
//   });
  
//   const sounds = [
//     { label: '소리 1', value: require('../../sounds/sound1.mp3') },
//     { label: '소리 2', value: require('../../sounds/sound2.mp3') },
//     { label: '소리 3', value: require('../../sounds/sound3.mp3') },
//   ];

//   const handleUpdateNickname = text => {
//     setUser(user => ({ ...user, nickname: text }));
//   };

//   const handlePlaySound = async (sound) => {
//     const soundObject = new Audio.Sound();
//     try {
//       await soundObject.loadAsync(sound);
//       await soundObject.playAsync();
//       setTimeout(() => {
//         soundObject.stopAsync();
//       }, 5000);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={user.backgroundImage} style={styles.backgroundImage} />
//       <View style={styles.profileSection}>
//         <Image source={user.profileImage} style={styles.profileImage} />
//         <View style={styles.nicknameContainer}>
//           {!editingNickname && (
//             <Text style={styles.nickname}>{user.nickname}</Text>
//           )}
//           {editingNickname && (
//             <>
//               <TextInput
//                 onChangeText={handleUpdateNickname}
//                 value={user.nickname}
//                 style={styles.nicknameInput}
//                 autoFocus
//               />
//               <TouchableOpacity
//                 style={styles.saveButton}
//                 onPress={() => setEditingNickname(false)}
//               >
//                 <Text style={styles.saveButtonText}>저장</Text>
//               </TouchableOpacity>
//             </>
//           )}
//           <TouchableOpacity
//             style={styles.editNicknameButton}
//             onPress={() => setEditingNickname(!editingNickname)}
//           >
//             <Ionicons name="pencil" size={16} color="#888" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.name}>{user.name}</Text>
//       </View>
//       <View style={styles.settingsSection}>
//         <Text style={styles.settingTitle}>🔔 삐삐 알람소리</Text>
//         <Picker
//           selectedValue={selectedSound}
//           onValueChange={itemValue => setSelectedSound(itemValue)}
//           style={styles.picker}
//         >
//           {sounds.map(sound => (
//             <>
//               <Picker.Item key={sound.value} label={sound.label} value={sound.value} />
//               <TouchableOpacity onPress={() => handlePlaySound(sound.value)}>
//                 <Ionicons name="volume-high" size={24} color="#888" />
//               </TouchableOpacity>
//             </>
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// // 스타일 코드는 생략합니다.
// });
