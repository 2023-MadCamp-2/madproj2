// ContactDropdownMenu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactDropdownMenu = ({ onCloseMenu, onEditContact, onDeleteContact }) => {
  return (
    <View style={styles.dropdownMenu}>
      <TouchableOpacity onPress={onCloseMenu} style={styles.menuItem}>
        <FontAwesome name="close" size={16} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEditContact} style={styles.menuItem}>
        <Text style={styles.menuItemText}>편집</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeleteContact} style={styles.menuItem}>
        <Text style={styles.menuItemText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownMenu: {
    position: 'absolute',
    top: '10%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 10, // 다음 카드 목록보다 위에 나타나도록 zIndex 설정
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1, // 드롭다운 메뉴 항목 사이에 구분선 추가
    borderColor: '#ddd', // 드롭다운 메뉴 항목 사이 구분선의 색상 설정
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ContactDropdownMenu;
