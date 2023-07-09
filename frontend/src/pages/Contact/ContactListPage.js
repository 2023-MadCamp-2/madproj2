import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import ContactDropdownMenu from '../../components/ContactDropdownMenu';

const ContactListPage = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const [searchText, setSearchText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const [selectedContact, setSelectedContact] = useState('');

  const contacts = [
    { id:1, nickname: '아기공룡둘리', name: '박진아', image: require('../../images/profile1.jpeg') },
    { id:2, nickname: '검정기영이', name: '하도영', image: require('../../images/profile2.jpeg') },
    { id:3, nickname: '응답했다덕선이', name: '성덕선', image: require('../../images/profile3.jpeg') },
    { id:4, nickname: '아기공룡둘리', name: '박진아', image: require('../../images/profile1.jpeg') },
    { id:5, nickname: '검정기영이', name: '하도영', image: require('../../images/profile2.jpeg') },
    { id:6, nickname: '응답했다덕선이', name: '성덕선', image: require('../../images/profile3.jpeg') },
    { id:7, nickname: '아기공룡둘리', name: '박진아', image: require('../../images/profile1.jpeg') },
    { id:8, nickname: '검정기영이', name: '하도영', image: require('../../images/profile2.jpeg') },
    { id:9, nickname: '응답했다덕선이', name: '성덕선', image: require('../../images/profile3.jpeg') },

    // ... 나머지 연락처
  ];

  const filteredContacts = contacts
  .filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.nickname.toLowerCase().includes(searchText.toLowerCase())
  )
  .sort((a, b) => a.nickname.localeCompare(b.nickname));

  
  const handleAddContact = () => {
    if (name.trim() === '' || nickname.trim() === '') {
      alert('이름과 별명은 필수 입력 사항입니다.');
      return;
    }
    const newContact = {
      name: name,
      nickname: nickname,
      image: selectedImage,
    };
    // 연락처를 추가하는 로직 작성
    // contacts.push(newContact);
    // 추가한 연락처를 저장한 후에 Modal을 닫습니다.
    setIsModalVisible(false);
    setName('');
    setNickname('');
  };

  const handleEditContact = contact => {
    // 연락처 편집 로직 구현
    setSelectedContact(null);
  };

  const handleDeleteContact = contact => {
    // 연락처 삭제 로직 구현
    setSelectedContact(null);
  };

  const handleCloseMenu = contact => {
    // 연락처 삭제 로직 구현
    setSelectedContact(null);
  };

  if (!fontsLoaded) {
    return null;
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
      <FlatList
        data={filteredContacts}
        style={styles.listContainer}
        // keyExtractor={item => item.name}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // 리스트의 마지막에 여백을 줌
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <TouchableOpacity onLongPress={() => setSelectedImage(item.image)}>
                <Image source={item.image} style={styles.profileImage} />
              </TouchableOpacity>
              <View>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </View>
            
            <TouchableOpacity onPress={() => {
              setSelectedContact(item.id);
            }} >
              <Ionicons name="ellipsis-vertical" size={20} color="#888" />
            </TouchableOpacity>

            {selectedContact == item.id && (
              <ContactDropdownMenu
                  style={[styles.dropdownMenu, { zIndex: 3 }]}
                  onBackdropPress={() => setSelectedContact(null)}
                  onCloseMenu={() => handleCloseMenu(item.id)}
                  onEditContact={() => handleEditContact(item.id)}
                  onDeleteContact={() => handleDeleteContact(item.id)}
              />
            )}
          </View>
        )}
      />
      
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
