import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { useFonts,  DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const SendPage = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
    getData();
  }, []);

  const [myName, setMyname] = useState('');

  const getData = async () => {
    const value = await AsyncStorage.getItem('myNickname');
    if (value !== null && value !== undefined) {
      setMyname(value);
    }
  };

  const [fontsLoaded] = useFonts({
      'DoHyeon' : DoHyeon_400Regular,
      'BlackHanSans' : BlackHanSans_400Regular,
  });

  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    if (route.params?.recipient) {
      setRecipient(route.params.recipient);
    }
  }, [route.params]);


  const contacts = useSelector(state => state.contacts);
  const [suggestions, setSuggestions] = useState([]);


  const handleRecipientChange = (text) => {
    setRecipient(text);
    if (text.length > 0) {
      // 검색어 자동완성 목록 업데이트
      const newSuggestions = contacts.filter(contact =>
        contact.friendNickname.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleNumberPress = (number) => {
    setMessage(prevMessage => prevMessage + number);
  };

  const handleCancelPress = () => {
    setMessage(prevMessage => prevMessage.slice(0, -1));
  };

  const handleSendPress = async() => {
      // 삐삐 전송 기능 구현
      if (!message || !recipient) {
        alert('Both message and recipient are required.');
        return;
      }
      
      console.log('내 닉네임:', myName);

      const payload = {
        /// 일단 previously, A로 구현해놓음
        from: myName, // Replace this with actual sender's nickname
        to: recipient,
        message: message,
      };
      
      try {
        const response = await fetch(`${API_URL}/chat/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
  
        setRecipient('');
        setMessage('');

      } catch (error) {
        console.error('Error occurred while sending message:', error);
        alert('Error occurred while sending message:', error.toString());
      }
      setRecipient('');
      setMessage('');
  };

  if (!fontsLoaded) {
      return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>To:</Text>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={handleRecipientChange}
          placeholder="친구의 삐삐별명"
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map(suggestion => (
              <TouchableOpacity
                key={suggestion.friendNickname}
                onPress={() => {
                  setRecipient(suggestion.friendNickname);
                  setSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{suggestion.friendNickname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.pagerContainer}>
        <View style={styles.pager}>
          <View style={styles.pagerScreen}>
            <Text style={styles.pagerText}>{message}</Text>
          </View>
          <View style={styles.pagerButtons}>
            <TouchableOpacity style={styles.pagerButton} />
            <Text style={{color: '#fff',fontFamily: 'DoHyeon', fontSize: 18}}>삐삐</Text>
            <TouchableOpacity style={styles.pagerButton} />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress(0)}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: '#F24C3D', opacity: message ? 1 : 0.5}}
          onPress={handleCancelPress}
        >
          <Text style={{...styles.buttonText, color: '#fff'}}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: '#F2BE22', opacity: message ? 1 : 0.5}}
          onPress={handleSendPress}
        >
          <Text style={{...styles.buttonText, color: '#fff'}}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'DoHyeon',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'DoHyeon',
    width: '50%',
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
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerScreen: {
    width: '70%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent:     'center',
    alignItems: 'center',
  },
  pagerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'BlackHanSans',
    paddingHorizontal: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '68%',
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .5,
    shadowRadius: 3,
    elevation: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'DoHyeon',
  },
  suggestionsContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 0,
  },
  suggestionText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'DoHyeon',
  },
});

export default SendPage;
