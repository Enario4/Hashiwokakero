import { BottomTabBar } from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GridLoader} from 'react-spinners/ClipLoader';
//import styles from '../Styles.css';


const Home = function({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.intro} >
                Bienvenue dans l'application de résolution du jeu Hashiwokakero 
            </Text>
            <StatusBar style="auto" hidden={true} />
            <TouchableOpacity onPress={() =>navigation.navigate('Photo')} style={styles.homeButton}>
                <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
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
});