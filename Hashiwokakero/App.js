import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Loading } from './screens/Loading.js';
import { Photo } from './screens/Photo.js';
import { Home } from './screens/Home.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Photo" component={Photo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#87CEEB',
  },

});