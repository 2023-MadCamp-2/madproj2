import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Home Page</Text>
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

export default HomePage;
