// App.js
import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/navigation';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import Navigation from './src/navigation/navigation';

// const App = () => {

    
//     return (
//         <Navigation />
//     );
// };

// export default App;
