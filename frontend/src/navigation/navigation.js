import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../pages/HomePage'; // 삐삐
import LoginPage from '../pages/Auth/LoginPage'; 
import SignupPage from '../pages/Auth/SignupPage';

import ContactPage from '../pages/Contact/ContactListPage';
import HistoryListPage from '../pages/History/HistoryListPage';
import SendPage from "../pages/Main/SendPage";
import  DictionaryPage from '../pages/Dictionary/DictionaryPage';
import MyPage from "../pages/MyPage/MyPage";
import BottomNav from '../components/BottomNav';

// page names for bottomTabs
const homeName = 'HomePage';
const contactName = 'ContactPage';
const historyName = 'HistoryListPage';
const sendName = 'SendPage';
const dictionaryName = 'DictionaryPage';
const mypageName = 'MyPage';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName} 
      tabBar={(props) => <BottomNav {...props} />}
       // BottomNav 컴포넌트를 tabBar로 지정
    >
      <Tab.Screen name="Contact" component={ContactPage} />
      <Tab.Screen name="History" component={HistoryListPage} />
      {/* <Tab.Screen name="Send" component={SendPage} /> */}
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Dictionary" component={DictionaryPage} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
