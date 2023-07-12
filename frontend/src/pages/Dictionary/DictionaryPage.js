import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { DoHyeon_400Regular } from '@expo-google-fonts/do-hyeon';

const DictionaryPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 헤더를 숨김
  }, []);

  const [fontsLoaded] = useFonts({
    'BlackHanSans': BlackHanSans_400Regular,
    'DoHyeon': DoHyeon_400Regular,
  });
  
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  const tags = [
    { name: 'All', icon: null },
    { name: 'hurry', icon: 'walk' },
    { name: 'emotion', icon: 'happy' },
    { name: 'love', icon: 'heart' },
    { name: 'friend', icon: 'people' },
    { name: 'food', icon: 'pizza' },
    { name: 'normal', icon: 'add-circle' },
  ];

  const words = [
    { word: '8282', meaning: '빨리빨리', tag: 'hurry' },
    { word: '82515',  meaning: '빨리 오시오',   tag: 'hurry' },
    { word: '8290',  meaning: '빨리 가자',   tag: 'hurry' },
    { word: '505',  meaning: 'SOS',   tag: 'hurry' },
    { word: '175',  meaning: '일찍와',   tag: 'hurry' },
    { word: '17175',  meaning: '일찍일찍와',   tag: 'hurry'},
    { word: '1200', meaning: '지금 바빠 (일이 빵빵)', tag: 'hurry' },
    { word: '8585', meaning: '바로바로', tag: 'hurry' },
    { word: '858555', meaning: '바로바로 와요', tag: 'hurry' },
    { word: '8578', meaning: '바로 출발!', tag: 'hurry' },
    { word: '10021002', meaning: '천천히', tag: 'hurry' },

    { word: '515',  meaning: '오~이런!',   tag: 'normal' },
    { word: '827',  meaning: '화이팅',   tag: 'normal' },
    { word: '9797', meaning: '구구절절 할 이야기가 많다', tag: 'normal' },
    { word: '9090', meaning: '가자가자 (GoGo)', tag: 'normal' },
    { word: '230', meaning: '이상 없음 (이상 無)', tag: 'normal' },
    { word: '7700', meaning: '드라이브 가자, 뛰뛰빵빵', tag: 'normal' },
    { word: '100', meaning: '돌아와', tag: 'normal' },
    { word: '1182', meaning: '일을 빨리 진행하시오.', tag: 'normal' },
    { word: '0909', meaning: '모든 일이 취소됨. (빵꾸)', tag: 'normal' },
    { word: '2468', meaning: '짝짝짝짝(박수)', tag: 'normal' },
    { word: '929', meaning: '그리구(AND)', tag: 'normal' },

    { word: '486',  meaning: '사랑해',   tag: 'love' },
    { word: '586',  meaning: '더 사랑해',   tag: 'love' },
    { word: '4486', meaning: '죽도록 사랑해', tag: 'love' },
    { word: '0404', meaning: '영원히 사랑해', tag: 'love' },
    { word: '012486', meaning: '영원히 사랑해', tag: 'love' },
    { word: '0242', meaning: '연인 사이', tag: 'love' },
    { word: '1000024', meaning: '많이 사랑해', tag: 'love' },
    { word: '1010235', meaning: '열렬히 사모', tag: 'love' },
    { word: '3575', meaning: '사무치게 그립다', tag: 'love' },    
    { word: '1052', meaning: '사랑해(love)', tag: 'love' },
    { word: '1004', meaning: '천사',     tag: 'love' },
    { word: '21004', meaning: '천사에게', tag: 'love' },
    
    { word: '0027', meaning: '땡땡이 치자', tag: 'friend' },
    { word: '5782', meaning: '호출 빨리', tag: 'friend' },
    { word: '7942', meaning: '친구사이', tag: 'friend' },
    { word: '7179', meaning: '친한 친구', tag: 'friend' },
    { word: '2848', meaning: '절교선언 (이판사판)', tag: 'friend' },
    { word: '952', meaning: '굿모닝', tag: 'friend' },
    { word: '982', meaning: '굿바이', tag: 'friend' },
    { word: '2072', meaning: '이 땡칠이 같은 녀석아', tag: 'friend' },
    { word: '091032', meaning: '공부 열심히!', tag: 'friend' },
    { word: '10321032', meaning: '열심히 열심히!', tag: 'friend' },
    { word: '1177155400', meaning: 'I MISS YOU', tag: 'friend' },
    { word: '337337', meaning: '힘내', tag: 'friend' },

    { word: '045', meaning: '빵 사와', tag: 'food' },
    { word: '1212', meaning: '술 마시자, 홀짝홀짝', tag: 'food' },
    { word: '1414', meaning: '식사하자', tag: 'food' },
    { word: '2045', meaning: '간식 사와', tag: 'food' },
    { word: '1000210002', meaning: '많이많이', tag: 'food' },
    { word: '12121212', meaning: '술 두잔해야지', tag: 'food' },
    { word: '04041004', meaning: '빵 먹고 죽어 빵 100개 먹고 죽어', tag: 'food' },
    { word: '00', meaning: '배가 빵빵', tag: 'food' },

    { word: '11010', meaning: '흥! (돌려서 보면 흥이 됨)', tag: 'emotion' },
    { word: '10003', meaning: '만세', tag: 'emotion' },
    { word: '2929', meaning: '이그 이그 짜증나', tag: 'emotion' }, 
    { word: '129129', meaning: '아이구 아이구', tag: 'emotion' }, 
    { word: '10288', meaning: '열이 펄펄, 아파요', tag: 'emotion' },  
    { word: '5555555', meaning: '호~ (10288에 대한 답장)', tag: 'emotion' },  
    { word: '2222', meaning: '투덜투덜 (two-둘-two-둘)', tag: 'emotion' },  
    { word: '8888', meaning: '나 팔팔해~', tag: 'emotion' },  
    { word: '25', meaning: '미워', tag: 'emotion' },
    { word: '5825', meaning: '오빠 미워', tag: 'emotion' },
    { word: '1818', meaning: '나 무지 열받았다! (분노)', tag: 'emotion' },
    { word: '177155', meaning: '그립다 (miss)', tag: 'emotion' },
  ];

  useEffect(() => {
    filterWords();
  }, [selectedTag, searchKeyword]);

  const filterWords = () => {
    let filtered = words;

    if (selectedTag !== 'All') {
      filtered = filtered.filter(word => word.tag === selectedTag);
    }

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(word => word.word.toLowerCase().includes(keyword) || word.meaning.toLowerCase().includes(keyword));
    }

    setFilteredWords(filtered);
  };

  if (!fontsLoaded) {
    return null; // 또는 로딩 중임을 나타내는 컴포넌트를 반환할 수 있습니다.
  }

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
          />
        </View>
        <View style={styles.viewsContainer}>
          <FlatList
            horizontal
            data={tags}
            keyExtractor={item => item.name}
            contentContainerStyle={{ ...styles.tagContainer, alignItems: 'center' }} // 세로 정렬 조정
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  ...styles.tag,
                  backgroundColor: selectedTag === item.name ? '#000' : '#fff',
                  height: selectedTag === item.name ? 80 : 70,
                }}
                onPress={() => setSelectedTag(item.name)}
              >
                {item.icon ? (
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={selectedTag === item.name ? '#fff' : '#000'}
                  />
                ) : (
                  <Text
                    style={{
                      ...styles.tagText,
                      color: selectedTag === item.name ? '#fff' : '#000'
                    }}
                  >
                    {item.name}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
          <ScrollView
            style={{ marginBottom: 250 }}
            contentContainerStyle={{...styles.contentContainer, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.wordContainer}>
              <View style={styles.wordRow}>
                {filteredWords.map((word, index) => (
                  <View key={word.word} style={{ ...styles.wordCard, marginRight: index % 2 === 0 ? 10 : 0 }}>
                    <Text style={styles.word}>{word.word}</Text>
                    <Text style={styles.meaning}>{word.meaning}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
      </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginBottom: 100,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '80%',
    marginTop: 25,
  },
  searchIcon: {
    marginHorizontal: 5,
  },
  searchButton: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewsContainer: {
    width: '100%',
    paddingVertical: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingHorizontal: '8%',
    paddingVertical: 10,
  },
  tag: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    height: 60,
    paddingHorizontal: 13,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wordContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: '7.5%',
  },
  wordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .2,
    shadowRadius: 3,
    elevation: 3,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'BlackHanSans',
  },
  meaning: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'DoHyeon',
  },
});

export default DictionaryPage;
