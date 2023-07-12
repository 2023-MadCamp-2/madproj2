import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../pages/HomePage'; // 삐삐
import LoginPage from '../pages/Auth/LoginPage'; 
import SignupPage from '../pages/Auth/SignupPage';
import HistoryRoomPage from "../pages/History/HistoryRoomPage";

import ContactPage from '../pages/Contact/ContactListPage';
import HistoryListPage from '../pages/History/HistoryListPage';
import SendPage from "../pages/Main/SendPage";
import  DictionaryPage from '../pages/Dictionary/DictionaryPage';
import MyPage from "../pages/MyPage/MyPage";
import BottomNav from '../components/BottomNav';

import CustomHeader from "../components/CustomHeader";

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
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
      }}  
      initialRouteName={homeName} 
      tabBar={(props) => <BottomNav {...props} />}
       // BottomNav 컴포넌트를 tabBar로 지정
    >
      <Tab.Screen name="Contact" component={ContactPage} />
      <Tab.Screen name="History" component={HistoryListPage} />
      <Tab.Screen name="Send" component={SendPage} />
      {/* <Tab.Screen name="Home" component={HomePage} /> */}
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
        <Stack.Screen name="Login" options={{headerShown: false,}} component={LoginPage} />
        <Stack.Screen name="Signup" options={{headerShown: false,}}  component={SignupPage} />
        <Stack.Screen name="Main" options={{
        header: ({ scene }) => (
            <CustomHeader  />
          ),
        }}
        component={MyTabs} />
        <Stack.Screen name="HistoryRoom" component={HistoryRoomPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
