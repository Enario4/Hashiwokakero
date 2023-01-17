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
    const Loade = () => {
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
           
            const response = await fetch('http://192.168.37.71:50030/${uuid}/resultsolving'); // revoir adresse 
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            // assume that the json object has a property called "imageUri"
            setImageUri(json.imageUri);
            setIsLoading(false);
        };

        useEffect(() => {
            loadImage();
        }, []);

        if (isLoading) {
            return <Loade />;
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

  /* import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, ProgressBar } from 'react-native';

const Loading = function({navigation}) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const [uuid, setUuid] = useState(null);

    const getUuid = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5252/get-uuid'); // revoir adresse 
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setUuid(json.uuid);
        } catch (error) {
            console.log("erreur dans la récupération de l'uuid", error);
        }
    };

    useEffect(() => {
        getUuid();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5252/status/${uuid}`); // revoir adresse 
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setProgress(json.progress);
                if(json.progress === 100){
                    clearInterval(interval);
                    setIsLoading(false);
                    const responseImage = await fetch(`http://127.0.0.1:5252/image/${uuid}`);
                    if (!responseImage.ok) {
                        throw new Error(responseImage.statusText);
                    }
                    const jsonImage = await responseImage.json();
                    setImageUri(jsonImage.imageUri);
                }
            } catch (error) {
                console.log("erreur dans la récupération de l'avancement", error);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [uuid]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.intro} >
                Résolution en cours
                </Text>
                <ProgressBar progress={progress} />
                <ActivityIndicator size='large' color="white" />
            </View>
        );
    }
     return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </View>
  );
}*/
