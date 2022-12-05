import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {GridLoader} from 'react-spinners/ClipLoader';
import { App } from '../App.js';
//import styles from '../Styles.css';
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);


const Photo = function({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview}>
                <Text> Prise de la grille en photo </Text>
                <TouchableOpacity onPress={() =>navigation.navigate("Home")} style={styles.homeButton}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
export {Photo};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
    homeButton: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5
    },
  });