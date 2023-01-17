import { BottomTabBar } from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { useState } from "react";
import {GridLoader} from 'react-spinners/ClipLoader';
//import styles from '../Styles.css';


const Home = function({navigation}) {

    const [gridSize, setGridSize] = useState('');
    const [isBegin, setIsBegin] = useState(false);

    const renderValider = () => (
        <View style={styles.container}>
            <Text style={styles.intro} >
                Quelle taille de grille voulez-vous résoudre ? 
            </Text>
            <StatusBar style="auto" hidden={true} />
            <TextInput
                style={styles.input}
                value={gridSize}
                onChangeText={text => setGridSize(text)}
                placeholder="Taille de la grille"
                />
            <TouchableOpacity onPress={() => navigation.navigate('Photo',{ gridSize: gridSize })} style={styles.validateButton}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
      </View>
    )
    const renderCommencer = () => (
        <View style={styles.container}>
            <Text style={styles.intro} >
                Bienvenue dans l'application de résolution du jeu Hashiwokakero 
            </Text>
            <StatusBar style="auto" hidden={true} />
            <TouchableOpacity onPress={() => setIsBegin(true)} style={styles.homeButton}>
                <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
      </View>
    )
    return (
        <View style={styles.container}>
            {isBegin && renderValider()}
            {!isBegin && renderCommencer()}
       </View>
    );
}
Home.navigationOptions = {
    headerShown: false,
  }
export {Home};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CFFF',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    intro: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20,
        padding: 20,
    },
    validateButton: {
        backgroundColor: "white",
        width: "50%",
        height: "6%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 80,
        borderRadius: 20,        
    },
    homeButton: {
        backgroundColor: "white",
        width: "50%",
        height: "9%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 80,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 20,
        color: '#87CFFF',
    },
    input: {
        width: "50%",
        height: 40,
        borderColor: "white",
        borderWidth: 2,
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
        backgroundColor: "white",
    }
});