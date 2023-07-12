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
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handlePress(0)}>
          <View style={state.index === 0 ? styles.activeTab : null}>
            <MaterialCommunityIcons name="account-box" size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handlePress(1)}>
          <View style={state.index === 1 ? styles.activeTab : null}>
            <MaterialCommunityIcons name="chat-processing-outline" size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.addButtonContainer}>
        <View style={styles.addButton}>
          <TouchableOpacity onPress={() => handlePress(2)}>
            <MaterialCommunityIcons name="microphone" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handlePress(3)}>
          <View style={state.index === 3 ? styles.activeTab : null}>
            <MaterialCommunityIcons name="book-alphabet" size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handlePress(4)}>
          <View style={state.index === 4 ? styles.activeTab : null}>
            <MaterialCommunityIcons name="account" size={32} />
          </View>
        </TouchableOpacity>
      </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 5,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 5,
  },
  activeTab: {
    backgroundColor: '#62b5f7',
    borderRadius: 20,
    padding: 5,
  },
});

export default BottomNav;