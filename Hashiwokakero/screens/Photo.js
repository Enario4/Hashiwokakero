import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {GridLoader} from 'react-spinners/ClipLoader';
//import styles from '../Styles.css';
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import {decode as atob, encode as btoa} from 'base-64';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { captureRef } from 'react-native-view-shot';
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const validateButtonSize = Math.floor(WINDOW_HEIGHT * 0.04);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

// sudo ./mvnw spring-boot:run lancer orchestrator dans la vm, cd ~/Documents/orchestrator
const Photo = function({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef();
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
      const onCameraReady = () => {
        setIsCameraReady(true);
      };
      const switchCamera = () => {
        if (isPreview) {
          return;
        }
        setCameraType((prevCameraType) =>
          prevCameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      };
      const takePicture = async () => {
        if (cameraRef.current) {
          const options = { quality: 1, base64: true, skipProcessing: true };
          const data = await cameraRef.current.takePictureAsync(options);
          setPhoto(data);
          const source = data.uri;
          if (source) {
            await cameraRef.current.pausePreview();
            setIsPreview(true);
            console.log("picture source", source);
          }
        }
      };
      const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
      };
      const renderCancelPreviewButton = () => (
        <View style={styles.control}>
        <TouchableOpacity onPress={cancelPreview} style={styles.retakeButton} >
        <Text style={styles.buttonText}> {"Reprendre la photo"} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendPhoto} style={styles.validateButton}>
          <Text style={styles.buttonText}> {"Valider"} </Text>
        </TouchableOpacity>
        </View>
      );
      
      const sendPhoto = async () => {
         const daForm = new FormData();
         daForm.append('image', {
            uri: photo.uri,
            type: 'image/jpeg',
            name: 'image.jpg'
          });
         console.log("daform : ",daForm);
          fetch('http://127.0.0.1:5252/solving/upload-image', {
          method: 'POST',
          body: daForm,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          })
          .then(response => {
            if (response.ok) {
              // Successful request
              console.log("r??ponse  : ",response);
              return response;
            } else {
              // Request failed
              console.log('Request failed with status code:', response.status);
            }
           })
          .catch(err => {
            console.log("erreur dans la page photo",err);
          })
          navigation.navigate('Loading');
        };
      const renderCaptureControl = () => (
        <View style={styles.control}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera} style={styles.flipButton}>
            <Text style={styles.buttonText}>{"Flip"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={takePicture}
            style={styles.capture}
          />
        </View>
      );
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
      }
      return (
        <SafeAreaView style={styles.container}>
        <Camera
            ref={cameraRef}
            style={{flex: 1,width:"150%",height:"120%"}}
            type={cameraType}
            flashMode={Camera.Constants.FlashMode.on}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
            console.log("camera error", error);
            }}
        />
        <View style={styles.container}>
            {isPreview && renderCancelPreviewButton()}
            {!isPreview && renderCaptureControl()}
        </View>
        </SafeAreaView>
    );


}

export {Photo};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  flipButton: {
    backgroundColor: "#f5f6f5",
    marginLeft: -50,
    width: "15%",
    height: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#87CFFF',
  },
  retakeButton: {
    backgroundColor: "#f5f6f5",
    width: "50%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#87CFFF',
  },
  validateButton: {
    backgroundColor: "#f5f6f5",
    marginLeft: 20,
    width: "25%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#87CFFF',
  },
  buttonText: {
    fontSize: 15,
    color: '#87CFFF',
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderWidth: 3,
    borderColor: '#87CFFF',
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.scrollview}>
//                 <Text> Prise de la grille en photo </Text>
//                 <TouchableOpacity onPress={() =>navigation.navigate("Home")} style={styles.homeButton}>
//                     <Text style={styles.buttonText}>Home</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }
// export {Photo};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#87CEEB',
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//     homeButton: {
//         backgroundColor: "black",
//         padding: 10,
//         borderRadius: 5
//     },
//   });