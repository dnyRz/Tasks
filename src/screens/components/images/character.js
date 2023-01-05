import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Character extends Component {
  render() {
    return (
      <View style={styles.page}>
        <Image
            style={{height:'100%', width:'100%'}}
            resizeMode='cover'
            source={require('../../../assets/logoImages/character.gif')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    page:{
        height: 200,
        width: 200,
        margin: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})