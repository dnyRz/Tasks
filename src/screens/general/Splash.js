import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

//storage
import { getObjectData, storeObjectData } from '../../storage/Storage'
import { dataGroupsKey, dataIsLogedKey } from '../../storage/keys'

export default class Splash extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataGroupsKey: dataGroupsKey,
            dataIsLogedKey: dataIsLogedKey
        }
    }

    //async?
    async componentDidMount() {
        // let data = await getObjectData(this.state.dataIsLogedKey)
        // if(data==null){//sesion is not open
        //     //go to login
        //     console.log("Go to login")
        //     // setTimeout(() => {
        //     //     this.props.navigation.replace("Signin")
        //     // }, 2000)
        // }
        // else{
        //     // this.loadData()
        //     setTimeout(() => {
        //         //this.props.navigation.replace("Main")
        //     }, 2000)
        // }

        await this.loadData()
        this.props.navigation.replace("Main")
    }

    async loadData() {
        let devData = [
            // { id: 1, name: "Tarea con nombre largo", imageID:1, tasks:['id1', 'id2', '','','','','','','','','',''], notes:['id1, id2'] },
            // { id: 2, name: "dos", imageID:2, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 3, name: "tres", imageID:1, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 4, name: "cuatro", imageID:3, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 5, name: "cinco", imageID:2, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 6, name: "seis", imageID:6, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 7, name: "siete", imageID:5, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 8, name: "ocho", imageID:1, tasks:['id1', 'id2'], notes:['id1, id2'] },
            // { id: 9, name: "nueve", imageID:4, tasks:['id1', 'id2'], notes:['id1, id2'] }
        ] //todos los grupos
        await storeObjectData(this.state.dataGroupsKey, devData)

        //MODIFICAR
        // let aux = {
        //     isLoged: true
        // }
        // await storeObjectData(this.state.dataIsLogedKey, aux)
    }

    render() {
        return (
            <View style={styles.page}>
                <Text>Splash</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'grey'
    }
})