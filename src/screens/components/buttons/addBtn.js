import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class AddBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.add = this.add.bind(this)
    }

    add(){
        this.props.action()
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.add}>
                <Text style={{ fontSize: 30, color:'white' }}>+</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgba(104, 104, 104, 1)'
    }
})