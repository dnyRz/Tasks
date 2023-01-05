import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert, Animated } from 'react-native'
import React, { Component, useRef } from 'react'

//import a from '../../../assets'

const GroupCard = ({ item, deleteGroup, goToTasks, goToEdit }) => {
    const urls = [
        {id:1, url:require('../../../assets/images/tree.jpg')},
        {id:2, url:require('../../../assets/images/black.jpg')},
        {id:3, url:require('../../../assets/images/cold.jpg')},
        {id:4, url:require('../../../assets/images/forest.jpg')},
        {id:5, url:require('../../../assets/images/ice.jpg')},
        {id:6, url:require('../../../assets/images/river.jpg')}
    ]

    //Animated
    const fadeAnim = useRef(new Animated.Value(0.5)).current

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true // Add This line
        }).start();
      };
    
      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true // Add This line
        }).start();
      };

    //let image = require('../../../assets/images/black.jpg')
    let image, i
    for(i=0; i<urls.length; i++){
        if(item.imageID === urls[i].id){
            image = urls[i].url
            break
        }
    }
    // let image = urls[1].url
    // console.log(item.imageID)

    const action = () => {
        goToTasks(item.id)

        //DELETE THIS
        // goToEdit(item.id)
    }

    const actionDelete = () => {
        deleteGroup(item.id, ()=>{
            fadeOut()
        })
    }

    const actionEdit = () => {
        goToEdit(item.id)
    }

    const actionLongPress = () => {
        Alert.alert(
            "Options",
            "Hello :)",
            [
                { text: "Delete", onPress: actionDelete },
                { text: "Edit", onPress: actionEdit },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: true },
        );
    }

    fadeIn()

    return (
        <Animated.View style={[styles.container, {opacity: fadeAnim, transform: [{ scale: fadeAnim }]}]}>
            <TouchableOpacity
            // style={styles.container}
            onPress={action}
            delayLongPress={800}
            onLongPress={actionLongPress}>
            <ImageBackground
                style={styles.content}
                resizeMode='cover'
                source={image}
            >
                <View style={styles.opacity}>
                    <Text style={styles.text}>{item.name}</Text>
                        <View style={styles.numContainer}>
                            <Text style={styles.numText}>Tasks:{item.tasks.length}</Text>
                            <Text style={styles.numText}>Notes:{item.notes.length}</Text>
                        </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 180,
        width: 150,
        maxWidth: "46%",
        margin: '2%',
        borderRadius: 20,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },  
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    content: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        opacity: 70
    },
    opacity: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    text: {
        color: 'beige',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center'
    },
    numContainer:{
        position:'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    numText:{
        color: 'beige',
        fontSize: 12,
    }
})

export default GroupCard