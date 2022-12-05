import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import {GridLoader} from 'react-spinners/ClipLoader';
//import styles from '../Styles.css';


const Loading = function() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <ActivityIndicator size='large' color="white" />
            </ScrollView>
        </SafeAreaView>
    );
}
export {Loading};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
