import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, REST_API_KEY } from '@env';

const LoginPage = ({ navigation }) => { 

  const redirectUrl = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const dispatch = useDispatch();
  const images = useSelector(state => state.images);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (payload) => setNickname(payload);
  const onChangePW = (payload) => setPassword(payload);
  
  const handleLogin = async () => {
    try {
      console.log("handle Login!!!!");
      // 로그인 요청을 보낼 데이터 생성
      const userData = {
        nickname,
        password,
      };

      console.log(API_URL);``

      // 로그인 API 호출
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // 로그인 성공 시 처리할 로직 작성
        console.log('로그인 성공');

        AsyncStorage.setItem('myNickname', userData.nickname);
        
        // 로그인 성공 후 다음 화면으로 이동
        navigation.navigate('Main', { screen: 'Send' });
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

  const handleKakaoLogin = async () => {
    console.log(redirectUrl);
  
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;
    const result = await AuthSession.startAsync({ authUrl });
  
    if (result.type === 'success') {
      // 로그인 성공 시 처리할 로직 작성
      console.log('카카오 로그인 성공');
      
      // 인가 코드로 액세스 토큰 얻기
      const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&code=${result.params.code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      const tokenResult = await tokenResponse.json();
      const accessToken = tokenResult.access_token;
      
      console.log('accessToken:', accessToken);
  
      // 액세스 토큰으로 사용자 정보 가져오기
      const userInfoResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfoResult = await userInfoResponse.json();
      
      // 사용자 정보 출력
      console.log(userInfoResult);
      
      // 백엔드에서 사용자 데이터 검색
      const nickname = userInfoResult.kakao_account.profile.nickname + '삐삐';
      let response = await fetch(`${API_URL}/auth/user?nickname=${nickname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // 기존 사용자 데이터가 있는 경우
        console.log('기존 사용자 데이터 있음');
        
        // AsyncStorage에 nickname 저장
        AsyncStorage.setItem('myNickname', nickname);
        
        // 로그인 성공 후 다음 화면으로 이동
        navigation.navigate('Main', { screen: 'Contact' });
      } else {
        // 기존 사용자 데이터가 없는 경우
        console.log('기존 사용자 데이터 없음');
        
        // 백엔드에서 새로운 사용자 데이터 생성
        response = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInfoResult.kakao_account.profile.nickname,
            nickname,
            password: '',
          }),
        });
  
        if (response.ok) {
          // 회원가입 성공 시 처리할 로직 작성
          console.log('회원가입 성공');
          
          // AsyncStorage에 nickname 저장
          AsyncStorage.setItem('myNickname', nickname);
          
          // Redux 스토어에 프로필 이미지 저장
          dispatch({ type: 'SET_IMAGE', nickname, image: { uri: userInfoResult.kakao_account.profile.profile_image_url } });
          
          // 로그인 성공 후 다음 화면으로 이동
          navigation.navigate('Main', { screen: 'Contact' });
        } else {
          // 회원가입 실패 시 처리할 로직 작성
          console.log('회원가입 실패');
          const errorData = await response.json();
          console.log('에러 메시지:', errorData.message);
        }
      }
    } else {
      // 로그인 실패 시 처리할 로직 작성
      console.log('카카오 로그인 실패');
    }
  };
  
  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 컴포넌트를 렌더링하지 않습니다.
  }

  return(
      <View style={styles.container}>
          <Text style={{...styles.title, marginTop: '30%'}}>응답하라</Text>
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
              <TouchableOpacity onPress={handleKakaoLogin}>
              <Text style={{ ...styles.Btn, borderWidth: 0, backgroundColor: '#fae100', color: 'black' }}>카카오 로그인</Text>
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
