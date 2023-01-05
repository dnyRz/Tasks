import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Animated } from 'react-native';


const AddGroup = ({close, createNewGroup }) => {
    const [text, onChangeText] = React.useState('')
    //Animated
    const fadeAnim = useRef(new Animated.Value(0)).current
    
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
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

    const handlerAccept = async () => {
        if(text===''){
            //onChangeError(true)
            fadeIn()
            setTimeout(()=>{
                //onChangeError(false)
                fadeOut()
            }, 3000)
        }
        else{
            createNewGroup(text)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Add Group</Text>
                
                {/* Entrada de nombre */}
                <TextInput
                style={styles.input} 
                placeholder='Name'
                //value={nameGroup}
                maxLength={50}
                onChangeText={text => onChangeText(text)}
                />

                {/* Boton para aceptar */}
                <View style={styles.acceptBtn}>
                    <Button title='Accept' onPress={handlerAccept}/>
                </View>

                {/* Texto animado */}
                <Animated.View style={{opacity: fadeAnim}}>
                    <Text style={{marginTop:10}}>Ingresa un nombre :(</Text>
                </Animated.View>

                {/* Boton para cancelar */}
                <View style={styles.cancelBtn}>
                    <Button title='X' color={'tomato'} onPress={close}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content:{
        height: 250,
        width: '90%',
        //justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(250, 250, 250, 0.95)'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20
    },
    input:{
        width: '90%',
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: 'black'
    },
    acceptBtn:{
        position: 'absolute',
        bottom: 20
    },
    cancelBtn:{
        position: 'absolute',
        width: 30,
        height: 40,
        right: -10,
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AddGroup