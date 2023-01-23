import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, { useState, useRef, useEffect } from "react";

const Loading = function({route}) {
    const uuid = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [ImageUrl, setImageUrl] = useState(null);
    console.log(uuid)
    const url = "http://192.168.37.171:50030/solving/" + uuid.uuid + "/result"  
    console.log(url)

    useEffect(() => {
        const url = "http://192.168.37.171:50030/solving/" + uuid.uuid + "/result" 
    })
        return(
            <View style={styles.container}>
                <Image id="test" style={styles.image} source={{uri:"http://192.168.37.171:50030/solving/" + uuid.uuid + "/result"}} />
            </View>
        )
    }
            
        // http://192.168.37.171:50030/solving/c20bd563-21fa-479c-b780-371a11fdd939/result
    export {Loading};
//simulate api (like mokkon but on phone)
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

  