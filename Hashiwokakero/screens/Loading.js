// import {StatusBar} from 'expo-status-bar';
// import {StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
// import {GridLoader} from 'react-spinners/ClipLoader';
// //import styles from '../Styles.css';


// const Loading = function() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.intro} >
//                Résolution en cours
//             </Text>
//         {/* <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.scrollview}> */}
//                 <ActivityIndicator size='large' color="white" />
//             {/* </ScrollView>
//         </SafeAreaView>
//          */}
//       </View>
//     );
// }
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

const Loading = function({navigation}) {
    const Load = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.intro} >
                Résolution en cours
                </Text>
                <ActivityIndicator size='large' color="white" />
            </View>
        );
    }

    const ImageScreen = () => {
        const [imageUri, setImageUri] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        const loadImage = async () => {
            try {
                const response = await fetch('https://your-server.com/image-path');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                // assume that the json object has a property called "imageUri"
                setImageUri(json.imageUri);
                setIsLoading(false);
            } catch (error) {
                console.log("erreur dans la page loading",error);
            }
        };

        useEffect(() => {
            loadImage();
        }, []);

        if (isLoading) {
            return <Load />;
        }

        return (
            <View style={styles.container}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        );
    };
}
export {Loading};

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
    image: {
        width: '100%',
        height: '100%',
    },
  });
