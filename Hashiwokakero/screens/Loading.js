import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, { useState, useRef, useEffect } from "react";

const Loading = function({route}) {
    const {uuid} = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [ImageUri, setImageUri] = useState(null);

     useEffect(() => {
        const uuidtest="624b92d2-4ecc-4bad-8c3d-4c0879be25a5";
        fetch("http://192.168.37.171:50030/solving/"+uuidtest+"/result")
          .then(response => {
                if (!response.ok) {
                    console.log("pas ok du tout", JSON.stringify(response));
                } 
                console.log(JSON.stringify(response))
                console.log(JSON.stringify(response._bodyBlob._data.blobId))
            //   const uri = URL.createObjectURL(response._bodyBlob);
              setImageUri(response.url);
              setIsLoading(false);
            })
            .catch(err => {
                console.log("erreur", JSON.stringify(err.message))
            })
    })
    
        if (isLoading) {
          return (
            <View style={styles.container}>
                <Text style={styles.intro} >
                    Résolution en cours
                </Text>
                <ActivityIndicator size='large' color="white" />
             </View>
          );
        }
    
         return <Image source={{ uri: ImageUri }} />;
    }

    export {Loading};

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

// const Loading = function({navigation}) {
//     // const Loade = () => {
//     //     return (
                //<View style={styles.container}>
                //     <Image source={{ uri: imageUri }} style={styles.image} />
                // </View>
//     //     );
//     // }

//     const ImageScreen = () => {
//         const [imageUri, setImageUri] = useState(null);
//         const [isLoading, setIsLoading] = useState(true);

//         const loadImage = async () => {
           
//             fetch('http://192.168.37.71:50030/${uuid}/resultsolving')
//             .then(response => {
//                 if (response.ok) {
//                   // Successful request
//                   console.log("réponse  : ",response);
//                   setImageUri(response.json().imageUri);
//                   setIsLoading(false);
//                 //   navigation.navigate('Loading', {uuid: response._bodyBlob._data.blobId});
//                 } else {
//                   // Request failed
//                   console.log('Request failed with status code:', response.status);
//                 }
//                })
//               .catch(err => {
//                 console.log("erreur dans la page photo",err);
//               })            
//         };

//         useEffect(() => {
//             loadImage();
//         }, []);

//         // if (isLoading) {
//         //     return <Loade />;
//         // }

//         return (
//             <View style={styles.container}>
//             <Text style={styles.intro} >
//             Résolution en cours
//             </Text>
//             <ActivityIndicator size='large' color="white" />
//         </View>
//         );
//     };
// }

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
