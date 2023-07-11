import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts,  DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
import { BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { API_URL } from '@env';

const SendPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);

  const [fontsLoaded] = useFonts({
      'DoHyeon' : DoHyeon_400Regular,
      'BlackHanSans' : BlackHanSans_400Regular,
  });

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

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
      
      const payload = {
        /// 일단 previously, A로 구현해놓음
        from: "A", // Replace this with actual sender's nickname
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

        //console.log(response)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        alert('Sent', `Sent pager to ${recipient} with message ${message}`);
        setRecipient('');
        setMessage('');
      } catch (error) {
        console.error('Error occurred while sending message:', error);
        alert('Error occurred while sending message:', error.toString());
      }
      alert('Sent', `Sent pager to ${recipient} with message ${message}`);
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
          onChangeText={setRecipient}
          placeholder="친구의 삐삐별명"
        />
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
          style={{...styles.button, backgroundColor: '#ffcccc', opacity: message ? 1 : 0.5}}
          onPress={handleCancelPress}
        >
          <Text style={{...styles.buttonText, color: '#fff'}}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'orange', opacity: message ? 1 : 0.5}}
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
    backgroundColor: 'white',
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
});

export default SendPage;
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { useFonts,  DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';
// import { BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';

// const SendPage = ({ navigation }) => {
//   useEffect(() => {
//     navigation.setOptions({ headerShown: false }); // 헤더를 숨김
//   }, []);

//   const [fontsLoaded] = useFonts({
//       'DoHyeon' : DoHyeon_400Regular,
//       'BlackHanSans' : BlackHanSans_400Regular,
//   });

//   const [recipient, setRecipient] = useState('');
//   const [message, setMessage] = useState('');

//   const handleNumberPress = (number) => {
//     setMessage(prevMessage => prevMessage + number);
//   };

//   const handleCancelPress = () => {
//     setMessage(prevMessage => prevMessage.slice(0, -1));
//   };

//   const handleSendPress = () => {
//       // 삐삐 전송 기능 구현
//       alert('Sent', `Sent pager to ${recipient} with message ${message}`);
//       setRecipient('');
//       setMessage('');
//   };

//   if (!fontsLoaded) {
//       return null;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <Text style={styles.inputLabel}>To:</Text>
//         <TextInput
//           style={styles.input}
//           value={recipient}
//           onChangeText={setRecipient}
//           placeholder="친구의 삐삐별명"
//         />
//       </View>
//       <View style={styles.pagerContainer}>
//         <View style={styles.pager}>
//           <View style={styles.pagerScreen}>
//             <Text style={styles.pagerText}>{message}</Text>
//           </View>
//           <View style={styles.pagerButtons}>
//             <TouchableOpacity style={styles.pagerButton} />
//             <Text style={{color: '#fff',fontFamily: 'DoHyeon', fontSize: 18}}>삐삐</Text>
//             <TouchableOpacity style={styles.pagerButton} />
//           </View>
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
//           <TouchableOpacity
//             key={number}
//             style={styles.button}
//             onPress={() => handleNumberPress(number)}
//           >
//             <Text style={styles.buttonText}>{number}</Text>
//           </TouchableOpacity>
//         ))}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleNumberPress(0)}
//         >
//           <Text style={styles.buttonText}>0</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{...styles.button, backgroundColor: '#ffcccc', opacity: message ? 1 : 0.5}}
//           onPress={handleCancelPress}
//         >
//           <Text style={{...styles.buttonText, color: '#fff'}}>C</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{...styles.button, backgroundColor: 'orange', opacity: message ? 1 : 0.5}}
//           onPress={handleSendPress}
//         >
//           <Text style={{...styles.buttonText, color: '#fff'}}>전송</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     marginBottom: 100,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginRight: 10,
//     fontFamily: 'DoHyeon',
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     fontSize: 18,
//     fontFamily: 'DoHyeon',
//     width: '50%',
//   },
//   pagerContainer: {
//     width: '70%',
//     height: '28%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: .5,
//     shadowRadius: 3,
//     elevation: 10,
//   },
//   pager: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#000',
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pagerScreen: {
//     width: '70%',
//     height: '50%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     justifyContent:     'center',
//     alignItems: 'center',
//   },
//   pagerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     fontFamily: 'BlackHanSans',
//     paddingHorizontal: 10,
//   },
//   pagerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '50%',
//     marginTop: 15,
//   },
//   pagerButton: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     width: '68%',
//   },
//   button: {
//     width: '30%',
//     height: 50,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: .5,
//     shadowRadius: 3,
//     elevation: 10,
//   },
//   buttonText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     fontFamily: 'DoHyeon',
//   },
// });

// export default SendPage;