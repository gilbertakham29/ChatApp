import React from 'react';
import {SafeAreaView} from 'react-native';
import SimpleChat from './src/SimpleChat';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SimpleChat />
    </SafeAreaView>
  );
};

export default App;
