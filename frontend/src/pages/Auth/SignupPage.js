import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { API_URL } from '@env';
import CustomAlert from '../../components/CustomAlert';

const SignupPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });

  const [name, setName] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isNicknameChecked, setIsNicknameChecked] = React.useState(false);
  const [tempName, setTempName] = React.useState('');

  const [isVisibleAlert, setIsVisibleAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCheckNickname = async () => {
    try {
      // 닉네임 중복 확인 요청을 보낼 데이터 생성
      const checkData = { nickname };

      // 닉네임 중복 확인 API 호출
      const response = await fetch(`${API_URL}/auth/checkNickname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkData),
      });

      if (response.ok) {
        // 닉네임 중복 확인 성공 시 처리할 로직 작성
        setAlertMessage('닉네임 사용 가능');
        setIsVisibleAlert(true);
        setIsNicknameChecked(true);
        setTempName(nickname);
      } else {
        // 닉네임 중복 확인 실패 시 처리할 로직 작성
        setAlertMessage('닉네임 사용 불가');
        setIsVisibleAlert(true);
        setIsNicknameChecked(false);
        const errorData = await response.json();
        console.log('에러 메시지:', errorData.message);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 요청 에러:', error);
    }
  };

  const handleSignup = async () => {

    if(!name || !nickname || !password || !confirmPassword) {
      setAlertMessage('빈 칸을 모두 입력해주세요');
      setIsVisibleAlert(true);
      return;
    } else if (!isNicknameChecked) {
      // 닉네임 중복확인이 되지 않았으면 회원가입 진행하지 않음
      setAlertMessage('닉네임 중복확인을 해주세요');
      setIsVisibleAlert(true);
      return;
    } else if(nickname !== tempName) {
      setAlertMessage('닉네임 중복확인을 다시 해주세요');
      setIsVisibleAlert(true);
      return;
    }
    else if(password !== confirmPassword) { 
      setAlertMessage('비밀번호가 일치하지 않습니다');
      setIsVisibleAlert(true);
      return;
    }

    try {
      // 회원가입 요청을 보낼 데이터 생성
      const userData = {
        name,
        nickname,
        password,
      };

      // 회원가입 API 호출
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // 회원가입 성공 시 처리할 로직 작성
        console.log('회원가입 성공');
        // 회원가입 성공 후 다음 화면으로 이동
        navigation.navigate('Login');
      } else {
        // 회원가입 실패 시 처리할 로직 작성
        alert('회원가입 실패');
        const errorData = await response.json();
        console.log('에러 메시지:', errorData.message);
      }
    } catch (error) {
      console.error('회원가입 요청 에러:', error);
    }
  };

  const [isFormComplete, setIsFormComplete] = useState(false);

  // 중복확인과 입력 칸 상태 변화를 모니터링하여 회원가입 버튼 색 변경
  useEffect(() => {
    if (name && nickname && password && confirmPassword && isNicknameChecked) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [name, nickname, password, confirmPassword, isNicknameChecked]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, marginTop: '30%', paddingTop: '25%', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>회원가입</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="이름"
          value={name}
          onChangeText={setName}
          style={styles.input}
          returnKeyType="done"
        />
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="삐삐별명"
                value={nickname}
                onChangeText={setNickname}
                style={styles.input}
                returnKeyType="done"
            />
            <TouchableOpacity style={styles.checkButton} onPress={handleCheckNickname}>
                <Text style={{ color: 'white', fontFamily: 'DoHyeon'}}>중복확인</Text>
            </TouchableOpacity>
        </View>
        <TextInput
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          returnKeyType="done"
        />
        <TextInput
          placeholder="비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          returnKeyType="done"
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleSignup}>
            <Text style={{ ...styles.Btn, backgroundColor: isFormComplete ? '#F2BE22' : '#fae100' , color: isFormComplete ? 'white' : 'black'}}>
                회원가입
            </Text>
        </TouchableOpacity>
      </View>
      <CustomAlert 
        isVisible={isVisibleAlert} 
        message={alertMessage} 
        onClose={() => setIsVisibleAlert(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '600',
    fontFamily: 'BlackHanSans',
    backgroundColor: '#fff',
    width: '85%',
    textAlign: 'center',
  },
  form: {
    width: '85%',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  inputContainer: {
    position: 'relative',
  },
  checkButton: {
    position: 'absolute',
    right: 0,
    top: '30%',
    transform: [{ translateY: -10 }],
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor:'#F24C3D',
    borderRadius: 20,
  },
  input: {
    fontSize: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    width: '85%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 80,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30
  },
  Btn: {
    fontSize: 16,
    fontWeight: '600',
    width: 300,
    marginVertical: 5,
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'DoHyeon',
  },
});

export default SignupPage;
