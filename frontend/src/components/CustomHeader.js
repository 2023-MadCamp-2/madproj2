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
      <View style={[styles.section, styles.redSection]} />
      <View style={[styles.section, styles.orangeSection]} />
      <View style={[styles.section, styles.yellowSection]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
  },
  section: {
    flex: 1,
  },
  redSection: {
    backgroundColor: 'red',
  },
  orangeSection: {
    backgroundColor: 'orange',
  },
  yellowSection: {
    backgroundColor: 'yellow',
  },
});

export default CustomHeader;
