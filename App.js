import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { LogBox, Alert } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);
  const firebaseConfig = {
    apiKey: "AIzaSyDKmd5q28tafIMnGclC6Ewo68CKueETQL0",
    authDomain: "chat-app-1a7e3.firebaseapp.com",
    projectId: "chat-app-1a7e3",
    storageBucket: "chat-app-1a7e3.appspot.com",
    messagingSenderId: "968274496353",
    appId: "1:968274496353:web:c5a16ffcccca0b93eb9320"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Start">
        <stack.Screen name="Start" component={Start} />
        <stack.Screen name="Chat">
           {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;