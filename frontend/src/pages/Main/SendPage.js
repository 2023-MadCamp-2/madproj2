import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SendPage = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);
  
  return (
    <View>
      <Text>Welcome to Send Page</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default SendPage;
