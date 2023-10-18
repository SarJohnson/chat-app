import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Start">
        <stack.Screen name="Start" component={Start} />
        <stack.Screen name="Chat" component={Chat} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;