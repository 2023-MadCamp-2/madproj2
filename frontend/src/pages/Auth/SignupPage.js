import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';

const apiUrl = process.env.API_URL;

const SignupPage = ({ navigation }) => {
    
    const [fontsLoaded] = useFonts({
        'BlackHanSans': BlackHanSans_400Regular,
        'DoHyeon': DoHyeon_400Regular,
    });

    const [name, setName] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSignup = async () => {
        try {
            // 회원가입 요청을 보낼 데이터 생성
            const userData = {
                name,
                nickname,
                password,
            };
        
            console.log(`${apiUrl}/auth/signup`);
            // 회원가입 API 호출
            const response = await fetch(`http://172.10.5.132:443/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const resData = await response.json();

            // 회원가입 결과 확인
            if (response.ok) {
              // 회원가입 성공 시 처리할 로직 작성
              console.log('회원가입 성공');
              // 회원가입 성공 후 다음 화면으로 이동
              navigation.navigate('Login'); // 예시로 로그인 화면으로 이동하도록 설정
            } else {
              // 회원가입 실패 시 처리할 로직 작성
              console.log('회원가입 실패');
              console.log('에러 메시지:', resData.message);
            }

            } catch (error) {
                console.error('회원가입 요청 에러:', error);
            }
    };

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.title, marginTop: 150 }}>회원가입</Text>

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
                        style={{ ...styles.input, flex: 1 }}
                        returnKeyType="done"
                    />
                    <TouchableOpacity style={styles.checkButton}>
                        <Text style={{color: 'white', fontFamily: 'DoHyeon',}}>중복확인</Text>
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
                    <Text style={{ ...styles.Btn, backgroundColor: 'white' }}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
    inputContainer: {
        position: 'relative',
    },
    checkButton: {
        position: 'absolute',
        right: 0,
        top: '25%',
        transform: [{ translateY: -10 }],
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: 'black',
        borderRadius: 15,
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
        borderWidth: 1,
        fontFamily: 'DoHyeon',
    },

})

export default SignupPage;