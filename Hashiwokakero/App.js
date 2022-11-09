import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.intro} >
        Bienvenue dans l'application de résolution du jeu Hashiwokakero 
      </Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => alert('Coucou !')} style={styles.button}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A34DF8',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    color: '#C9C9C9',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#C9C9C9",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#A34DF8',
  },

});
