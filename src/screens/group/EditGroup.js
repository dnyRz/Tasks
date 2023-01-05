import { Text, View, StyleSheet, TextInput, ScrollView, Button, Alert, BackHandler } from 'react-native'
import React, { Component } from 'react'

//custom components
import Carrousel from './components/carrousel'

//storage
import { getObjectData, storeObjectData } from '../../storage/Storage'
import { dataGroupsKey } from '../../storage/keys'

// import f from '../../assets/images/tree.jpg'
// ../../../assets/images/tree.jpg

export default class EditGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idGroup: this.props.route.params.id,
            nameGroup: this.props.route.params.name,
            imageID: this.props.route.params.imageID,
            newNameGroup: this.props.route.params.name,
            saved: false
        }
        this.setImageID = this.setImageID.bind(this)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.handlerSave = this.handlerSave.bind(this)
        this.handlerCancel = this.handlerCancel.bind(this)
        this.saveData = this.saveData.bind(this)
        this.goToHome = this.goToHome.bind(this)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    setImageID (newID){
        this.setState({imageID:newID})
    }

    //This does not work as it has becouse "async"
    //this.props.navigation.replace("Main") -> "resolve the problem (aparently)"
    async handleBackButtonClick() {
        const AsyncAlert = () => new Promise((resolve) => {
            Alert.alert(
                'Discard changes!',
                'This action will eliminate all changes',
                [
                    {
                        text: "Continue editing!",
                        onPress: () => {  },
                        style: "cancel"
                    },
                    //This executes Main component did mount
                    // { text: "OK", onPress: () => { this.props.navigation.replace("Main") } }
                    { text: "OK", onPress: () => { this.props.navigation.goBack() } }
                ],
                { cancelable: true },
            );
        });

        await AsyncAlert()
        return true
    }

    handlerSave() {
        if (this.state.newNameGroup != '') {
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
                        // console.log("Antes de save")
                        await this.saveData()
                        // console.log("Despues de save")
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
        this.props.navigation.navigate({
            name: 'Main',
            //params: { id: this.state.idGroup, newName: this.state.newNameGroup, newImageID:this.state.imageID },
            merge: true,
        });
    }

    async saveData() {
        let groups = await getObjectData(dataGroupsKey)
        let i, limit = groups.length
        let idGroup = this.state.idGroup
        for(i=0; i<limit; i++){
            if(groups[i].id == idGroup){
                break
            }
        }
        groups[i].imageID = this.state.imageID
        groups[i].name = this.state.newNameGroup
        await storeObjectData(dataGroupsKey, groups)
    }

    render() {
        return (
            <ScrollView
                style={styles.page}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{this.state.nameGroup}</Text>
                    <View style={styles.dataInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='New name'
                            value={this.state.newNameGroup}
                            onChangeText={(text) => this.setState({ newNameGroup: text })}
                        />

                        {/* Images carrousel */}
                        <Carrousel imageID={this.state.imageID} setImageID={this.setImageID}/>

                        {/* Buttons */}
                        <View style={styles.buttonsContainer}>
                            <Button title={'   Save   '} color={''} onPress={this.handlerSave} />
                            <Button title={'Cancel'} color={'tomato'} onPress={this.handlerCancel} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    content: {

    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    dataInput: {
        padding: '0%'
    },
    input: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    buttonsContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})