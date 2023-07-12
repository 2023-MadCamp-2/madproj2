import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/navigation';
import store from './src/store';
import * as Notifications from 'expo-notifications';
import ReceiveModal from './src/components/ReceiveModal';

const App = () => {
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [receivedFrom, setReceivedFrom] = useState(null);
  const notificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    // 알림이 도착하면 실행될 핸들러 설정
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  useEffect(() => {
    if (notificationResponse && notificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
      // 알림이 클릭되었을 때
      const from = notificationResponse.notification.request.content.data.from;
      const message = notificationResponse.notification.request.content.data.message;
      setReceivedFrom(from);
      setReceivedMessage(message);
    }
  }, [notificationResponse]);

  return (
    <Provider store={store}>
      <Navigation />
      {receivedMessage && (
        <ReceiveModal
          from={receivedFrom}
          message={receivedMessage}
          onClose={() => setReceivedMessage(null)}
        />
      )}
    </Provider>
  );
};

export default App;

// // App.js
// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import Navigation from './src/navigation/navigation';
// import store from './src/store';
// import * as Notifications from 'expo-notifications';

// const App = () => {
//   useEffect(() => {
//     // 알림이 도착하면 실행될 핸들러 설정
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }, []);

//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// };

// export default App;
