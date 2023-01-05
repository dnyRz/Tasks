import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert, Animated } from 'react-native'
import React, { Component, useRef } from 'react'

/*
USAR Dialog
    Cada tarea es un dialog
    https://reactnativeelements.com/docs/components/dialog

    https://reactnativeelements.com/docs/components/speeddial

*/

const TaskCard = ({ item, goToEditTask, deleteTask }) => {

    const customStyle = () => {
        let bc = 'rgba(104, 104, 104, 0.3)' //default
        if (item.status == 1) {//finish
            bc = 'rgba(188, 255, 175, 0.5)'
        }
        else if (item.status == 2) {//important
            bc = 'rgba(255, 175, 175, 0.5)'
        }
        else if (item.status == 3) {
            bc = 'rgba(255, 165, 47, 0.3)'
        }

        return {
            height: 100,
            width: '95%',
            margin: 5,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: bc
        }
    }

    const editTask = () => {
        goToEditTask(item.id)
    }

    const auxDelete = () => {
        deleteTask(item.id)
    }

    const handlerDeleteTask = () => {
        Alert.alert(
            "Delete task",
            "This action can't be undone",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Delete", onPress: auxDelete }
            ],
            { cancelable: true },
          );
    }

    return (
        <TouchableOpacity
            style={customStyle()}
            onPress={editTask}
            delayLongPress={800}
            onLongPress={handlerDeleteTask}
            >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.date}</Text>
                </View>
                <View style={styles.body}>
                    <Text>{item.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '95%',
        margin: 5,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#rgba(104, 104, 104, 0.5)'
    },
    content: {
        height: '100%',
        width: '100%',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        overflow: 'hidden',
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default TaskCard