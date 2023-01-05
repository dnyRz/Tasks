/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
} from 'react-native';

//Main menu
import Menu from './src/navigation/MainMenu';

const App: () => Node = () => {
  return (
    <Menu />
  );
};


export default App;
