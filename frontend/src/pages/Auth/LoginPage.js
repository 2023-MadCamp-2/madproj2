import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
const LoginPage = ({ navigation }) => { 

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (payload) => setNickname(payload);
  const onChangePW = (payload) => setPassword(payload);
  
  const handleLogin = async () => {
    try {
      // 로그인 요청을 보낼 데이터 생성
      const userData = {
        nickname,
        password,
      };

      // 로그인 API 호출
      const response = await fetch(`http://172.10.5.132:443/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // 로그인 성공 시 처리할 로직 작성
        console.log('로그인 성공');
        // 로그인 성공 후 다음 화면으로 이동
        navigation.navigate('Send'); // 예시로 홈 화면으로 이동하도록 설정
      } else {
        // 로그인 실패 시 처리할 로직 작성
        console.log('로그인 실패');
        const errorData = await response.json();
        console.log('에러 메시지:', errorData.message);
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
    }
  };

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
                  value={nickname}
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
              <TouchableOpacity onPress={handleLogin}>
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
      borderWidth:1,
      fontFamily: 'DoHyeon',
  },
  
})

export default LoginPage;
