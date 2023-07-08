import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const HistoryListPage = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);
  
  return (
    <View>
      <Text>HistoryListPage</Text>
    </View>
  );
}

export default HistoryListPage;
