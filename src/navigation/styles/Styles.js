import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { Component } from 'react'

// import a from '../../assets/logoImages/headerBar.png'

//main screen options
function MainTitle() {
    return (
      <View style={styles.container}>
        <View style={{borderRadius: 10, overflow: 'hidden',}}>
        <ImageBackground 
        style={{ width: 40, height: 40 }}
        resizeMode='cover'
        source={require('../../assets/logoImages/headerBar.png')}
        />
        </View>
        <Text style={styles.title}>My Groups</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor:'green'
        // width:'90%',
        // height: '100%',
        // backgroundColor: 'pink',
        // alignSelf: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignSelf: 'flex-start',
    },
    title: {
        //alignSelf: 'center',
        color: "white",
        marginRight: '20%',
        fontWeight:'bold'
    }
})

export { MainTitle }