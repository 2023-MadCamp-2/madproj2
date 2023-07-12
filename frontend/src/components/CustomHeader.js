import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';

const CustomHeader = () => {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': BlackHanSans_400Regular,
        'DoHyeon': DoHyeon_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>응답하라 삐삐</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'BlackHanSans',
    margin: 25,
  },
});

export default CustomHeader;
