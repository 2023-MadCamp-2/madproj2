import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNav = ({ state, navigation }) => {
  const handlePress = (index) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(state.routes[index].name);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress(0)}>
        <MaterialCommunityIcons name="account-box" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(1)}>
        <MaterialCommunityIcons name="chat-processing-outline" size={32} />
      </TouchableOpacity>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handlePress(2)}>
          <MaterialCommunityIcons name="microphone" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handlePress(3)}>
        <MaterialCommunityIcons name="book-alphabet" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(4)}>
        <MaterialCommunityIcons name="account" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    marginVertical: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: '#000',
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default BottomNav;
