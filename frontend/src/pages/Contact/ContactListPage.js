import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import ContactDropdownMenu from '../../components/ContactDropdownMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const ContactListPage = ({navigation}) => {

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
    getData();

    console.log("get Data 실행");
  }, []);

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const images = useSelector(state => state.images);
  
  const [searchText, setSearchText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const [selectedContact, setSelectedContact] = useState('');
  const [myName, setMyname] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const value = await AsyncStorage.getItem('myNickname');
    if (value !== null && value !== undefined) {
      setMyname(value);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [myName]);
  
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contact?myName=${myName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.contacts);
      const contacts = data.contacts.map(contact => {
        if (!images[contact.friendNickname]) {
          console.log('이미지가 없는 경우')
          console.log(contact.friendNickname)
          // 이미지가 null인 경우에만 랜덤 이미지를 할당
          const images = [
            require('../../images/profile1.jpeg'),
            require('../../images/profile2.jpeg'),
            require('../../images/profile3.jpeg'),
            require('../../images/background1.jpeg')
          ];
          // 랜덤 이미지를 할당하고, Redux 스토어에 저장
          const image = images[Math.floor(Math.random() * images.length)];
          dispatch({ type: 'SET_IMAGE', nickname: contact.friendNickname, image });
          return {
            ...contact,
            image
          };
        } else {
          console.log('이미지가 있는 경우')
          console.log(contact.friendNickname)
          // 이미지가 이미 할당된 경우는 기존 이미지 유지
          return {
            ...contact,
            image: images[contact.friendNickname]
          };
        }
      });
      dispatch({ type: 'SET_CONTACTS', contacts });
  
      setIsLoading(false);}
      else {
        console.log('친구 목록 불러오기 실패');
      }
    } catch (error) {
      console.error('친구 목록 불러오기 에러:', error);
    }
  };

  const filteredContacts = contacts
    ? contacts
        .filter(contact =>
          (contact.friendName && contact.friendName.toLowerCase().includes(searchText.toLowerCase())) ||
          (contact.friendNickname && contact.friendNickname.toLowerCase().includes(searchText.toLowerCase()))
        )
        .sort((a, b) => a.friendNickname.localeCompare(b.friendNickname))
    : [];

  const handleAddContact = async () => {
      if (name.trim() === '' || nickname.trim() === '') {
        alert('이름과 별명은 필수 입력 사항입니다.');
        return;
      }
      try {
        // 내 이름 정보를 서버에 전달
        const response = await fetch(`${API_URL}/contact/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ myName: myName, friendName: name, friendNickname: nickname }),
        });
    
        if (response.ok) {
          
            const data = await response.json();
            console.log(data.message);
            setIsModalVisible(false);
            setName('');
            setNickname('');

            fetchContacts();
        } else {
            console.log('친구 추가 실패');
        }
      } catch (error) {
            console.error('친구 추가 에러:', error);
      } 
    
  };

  const handleEditContact = contact => {
    // 연락처 편집 로직 구현
    setSelectedContact(null);
  };

  const handleDeleteContact = async (contact) => {
    try {
      // 내 이름 정보를 서버에 전달
      const response = await fetch(`${API_URL}/contact/${contact.friendNickname}?myName=${myName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setSelectedContact(null);

        fetchContacts();
      } else {
        console.log('친구 삭제 실패');
      }
    } catch (error) {
      console.error('친구 삭제 에러:', error);
    }
};

  const handleCloseMenu = contact => {
    // 연락처 삭제 로직 구현
    setSelectedContact(null);
  };

  const handleClickEdit = contact => {
    console.log('연락처 편집 ', contact)
    setSelectedContact(contact);
  };


  if (!fontsLoaded || isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
      </View>

      { filteredContacts.length !== 0 ? (
        <FlatList
          data={filteredContacts}
          style={styles.listContainer}
          keyExtractor={item => item.friendNickname}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }} // 리스트의 마지막에 여백을 줌
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <TouchableOpacity onLongPress={() => setSelectedImage(item.image)}>
                  <Image source={item.image} style={styles.profileImage} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.nickname}>{item.friendNickname}</Text>
                  <Text style={styles.name}>{item.friendName}</Text>
                </View>
              </View>
              
              <TouchableOpacity onPress={() => {handleClickEdit(item)}} >
                  <Ionicons name="ellipsis-vertical" size={20} color="#888" />
              </TouchableOpacity>

              {selectedContact && selectedContact.friendNickname == item.friendNickname && (
                <ContactDropdownMenu
                  style={[styles.dropdownMenu, { zIndex: 3 }]}
                  onBackdropPress={() => setSelectedContact(null)}
                  onCloseMenu={() => handleCloseMenu(item)}
                  onEditContact={() => handleEditContact(item)}
                  onDeleteContact={() => handleDeleteContact(item)}
                />
              )}
            </View>
          )}
        />)
       : (
        <View style={styles.listContainer}>
          <Text>No Contacts</Text>
        </View>
       )}
        
      <TouchableOpacity style={styles.floatingButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <Modal isVisible={selectedImage !== null} onBackdropPress={() => setSelectedImage(null)}>
        <View style={styles.modalContent}>
          <Image source={selectedImage} style={styles.modalImage} resizeMode="cover" />
        </View>
      </Modal>
      <Modal isVisible={selectedImage !== null} onBackdropPress={() => setSelectedImage(null)}>
        <View style={styles.modalContent}>
          <Image source={selectedImage} style={styles.modalImage} resizeMode="cover" />
        </View>
      </Modal>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Contact</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Nickname"
            value={nickname}
            onChangeText={setNickname}
            style={styles.modalInput}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddContact}>
            <Text style={styles.modalButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      marginBottom: 100,
    },
    listContainer: {
      width: '80%',
      paddingVertical: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 10,
      width: '80%',
      marginTop: 25, // SearchBox를 아래로 이동시킴
    },
    searchIcon: {
      marginRight: 5,
    },
    input: {
      flex: 1,
      fontSize: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginVertical: 8,
      zIndex: 1,
    },
    cardInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
      marginRight: 20,
    },
    nickname: {
      fontSize: 17,
      fontWeight: 'bold',
      fontFamily: 'DoHyeon'
    },
    name: {
      fontSize: 13,
      color: '#888',
      fontFamily: 'DoHyeon'
    },
    modalContent: {
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    modalImage: {
      width: 250,
      height: 250,
      borderRadius: 150,
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 25,
      padding: 30,
      width: '80%',
      marginHorizontal: '10%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalInput: {
      borderBottomWidth: 2,
      borderBottomColor: 'grey',
      paddingVertical: 14,
      paddingHorizontal: 10,
      fontSize: 15,
      marginBottom: 10,
    },
    modalButton: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 5,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'black',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ContactListPage;