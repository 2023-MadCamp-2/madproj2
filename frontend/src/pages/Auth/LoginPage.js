import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';

const LoginPage = ({ navigation }) => { 

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (payload) => setUsername(payload);
  const onChangePW = (payload) => setPassword(payload);
  
  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 컴포넌트를 렌더링하지 않습니다.
  }

  return(
      <View style={styles.container}>
          <Text style={{...styles.title, marginTop: 150}}>응답하라</Text>
          <Text style={styles.title}>삐삐</Text>

          <View style={styles.form}>
              <TextInput 
                  onChangeText= {onChangeId}
                  placeholder={"삐삐별명"} 
                  style={styles.input}
                  returnKeyType = "done"
                  value={username}
              />
              <TextInput 
                  secureTextEntry
                  onChangeText = {onChangePW}
                  placeholder={"삐삐암호"} 
                  style={styles.input}
                  returnKeyType = "done"
                  value={password}
              />
          </View>
          <View style={styles.button}>
              <TouchableOpacity>
                  <Text style={{...styles.Btn, backgroundColor:'white'}}>로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>          
                  <Text style={{...styles.Btn, backgroundColor:'black', color:'white'}}>간편 회원가입</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
  },
  title: {
      fontSize: 60,
      fontWeight: '600',
      fontFamily: 'BlackHanSans',
  },
  form: {
      width: '80%',
  },
  input: {
      fontSize: 15,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 10,
      paddingVertical: 14,
      paddingHorizontal: 10,
  },
  button: {
      width: '80%',
      alignItems: 'center',
      marginTop: 30,
  },
  Btn: {
      fontSize: 16,
      fontWeight: '600',
      width: 300,
      marginVertical: 5,
      paddingVertical: 10,
      textAlign: 'center',
      borderRadius: 10,
      borderWidth:1
  },
  
})

export default LoginPage;
