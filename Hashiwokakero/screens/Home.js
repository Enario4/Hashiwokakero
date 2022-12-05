import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {GridLoader} from 'react-spinners/ClipLoader';
import { App } from '../App.js';
//import styles from '../Styles.css';


const Home = function({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.intro} >
                Bienvenue dans l'application de résolution du jeu Hashiwokakero 
            </Text>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() =>navigation.navigate('Photo')} style={styles.button}>
                <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
      </View>
    );
}
export {Home};

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
        Top: 20,
    },
    homeButton: {
        backgroundColor: "white",
        width:"100%",
        justifyContent: 'center',
        position:'relative',
    },
  });