import { Text, View, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { Component } from 'react'
import { CheckBox, Icon } from '@rneui/themed';

//storage
import { getObjectData, storeObjectData } from '../../storage/Storage';
import { dataGroupsKey } from '../../storage/keys';

export default class EditTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupID: this.props.route.params.groupID, 
            taskID: this.props.route.params.id,
            name: this.props.route.params.name,
            description: this.props.route.params.description,
            date: this.props.route.params.date,
            status: this.props.route.params.status,
            c1: false,
            c2: false,
            c3: false
        }
        this.toggleStatus = this.toggleStatus.bind(this)
        this.handlerSave = this.handlerSave.bind(this)
        this.handlerCancel = this.handlerCancel.bind(this)
        this.saveData = this.saveData.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }

    componentDidMount() {
        // console.log(this.props.route.params)
        if (this.state.status == 1) {
            this.setState({ c1: true })
        }
        else if (this.state.status == 2) {
            this.setState({ c2: true })
        }
        else if (this.state.status == 3) {
            this.setState({ c3: true })
        }
    }

    toggleStatus(id) {
        if(id==1){
            let aux = this.state.c1
            if(!aux==true){
                this.setState({c1:!aux, c2:false, c3:false, status:1})
            }
            else{
                this.setState({c1:!aux, status:0})   
            }
        }
        else if(id==2){
            let aux = this.state.c2
            if(!aux==true){
                this.setState({c2:!aux, c1:false, c3:false, status:2})
            }
            else{
                this.setState({c2:!aux , status:0})   
            }
        }
        else if(id==3){
            let aux = this.state.c3
            if(!aux==true){
                this.setState({c3:!aux, c2:false, c1:false, status:3})
            }
            else{
                this.setState({c3:!aux, status:0})   
            }
        }
    }

    handlerSave() {
        if (this.state.name != '') {
            Alert.alert(
                "Save changes",
                "Hello :)",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: async () => { 
                        await this.saveData()
                        this.goToHome() 
                    } }
                ]
            );
        }
        else {
            Alert.alert(
                "Error",
                "Enter a valid name :(",
                [
                    { text: "OK", onPress: () => console.log("OK pressed") }
                ]
            );
        }
    }

    handlerCancel() {
        Alert.alert(
            "Stop editing",
            "This action will eliminate all changes",
            [
                {
                    text: "Continue editing!",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => { this.goToHome() } }
            ]
        );
    }

    goToHome() {
        // console.log("GO TO HOME")
        this.props.navigation.goBack()
        // this.props.navigation.navigate({
        //     name: 'Main',
        //     //params: { id: this.state.idGroup, newName: this.state.newNameGroup, newImageID:this.state.imageID },
        //     merge: true,
        // });
    }

    async saveData() {
        // console.log("SAVE DATA")
        let groups = await getObjectData(dataGroupsKey)
        let i, limit = groups.length
        let idGroup = this.state.groupID
        for(i=0; i<limit; i++){
            if(groups[i].id == idGroup){
                break
            }
        }
        let tasks = groups[i].tasks
        let idTask = this.state.taskID
        let j
        limit = tasks.length
        for(j=0; j<limit; j++){
            if(tasks[j].id == idTask){
                break;
            }
        }
        // console.log("*****************")
        // console.log("T: " + j)
        // console.log("ANTES")
        // console.log(groups[i].tasks[j])
        groups[i].tasks[j] = {
            groupID: this.state.groupID,
            id: this.state.taskID,
            status: this.state.status,
            name: this.state.name,
            description: this.state.description,
            date: this.state.date
        }
        // console.log("DESPUES")
        // console.log(groups[i].tasks[j])

        await storeObjectData(dataGroupsKey, groups)
    }

    render() {
        return (
            <ScrollView style={styles.page}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.inputName}
                        value={this.state.name}
                        maxLength={30}
                        onChangeText={(text) => { this.setState({ name: text }) }}
                        placeholder='Name'
                    />
                    <TextInput
                        style={styles.inputDescription}
                        value={this.state.description}
                        multiline={true}
                        numberOfLines={4}
                        maxLength={150}
                        onChangeText={(text) => { this.setState({ description: text }) }}
                        placeholder='Description'
                    />
                    <View style={styles.statusContainer}>
                        <CheckBox
                            center
                            title="Complete"
                            checked={this.state.c1}
                            onPress={()=>{
                                this.toggleStatus(1)
                            }}
                        />
                        <CheckBox
                            center
                            title="Important"
                            checked={this.state.c2}
                            onPress={()=>{
                                this.toggleStatus(2)
                            }}
                        />
                        <CheckBox
                            center
                            title="Other"
                            checked={this.state.c3}
                            onPress={()=>{
                                this.toggleStatus(3)
                            }}
                        />
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>
                            <Button title={'   Save   '} color={''} onPress={this.handlerSave} />
                            <Button title={'Cancel'} color={'tomato'} onPress={this.handlerCancel} />
                        </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {

    },
    inputName: {
        width: '80%',
        margin: 30,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    inputDescription: {
        width: '80%',
        height: 200,
        margin: 30,
        padding: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        textAlignVertical: 'top',
        borderRadius: 20
    },
    statusContainer: {
        flexDirection: 'row'
    },
    buttonsContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})