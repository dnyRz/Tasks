import { Text, View, ScrollView, StyleSheet, FlatList, Alert } from 'react-native'
import React, { Component } from 'react'

//Custom components
import AddBtn from '../components/buttons/addBtn'
import GroupCard from './components/groupCard'
import AddGroup from './components/addGroup'
import Character from '../components/images/character'

//storage
import { getObjectData, storeObjectData } from '../../storage/Storage'
import { dataGroupsKey } from '../../storage/keys'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGroupsKey: dataGroupsKey,

            showModalAddGroup: false,
            showModalEditGroup: false,
            groups: [] //todos los grupos 

        }
        // this.updateWindow = this.updateWindow.bind(this)
        this.closeModalAddGroup = this.closeModalAddGroup.bind(this)//addGroup
        this.addGroup = this.addGroup.bind(this)
        this.goToTasks = this.goToTasks.bind(this)
        this.goToEdit = this.goToEdit.bind(this)
        this.createNewGroup = this.createNewGroup.bind(this)
        //update group in "static getDerivedStateFromProps"
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    async componentDidMount() {
        console.log("COMPONENT DID MOUNT MAIN")

        //to update groups
        this.props.navigation.addListener('focus', async()=>{
            console.log("Listener Focus")
            let data = await getObjectData(this.state.dataGroupsKey)
            this.setState({ groups: data }) 
        })

        let data = await getObjectData(this.state.dataGroupsKey)
        this.setState({ groups: data })
    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus')
    }

    //I AVOID USING THIS BY ADDING LISTENER IN COMPONENT DID MOUNT
    //BUT EACH SCREEN THAT MAKE CHANGES LOAD ALL GROUPS AND STORE ALL GROUPS
    //to update groups
    // static getDerivedStateFromProps(nextProps, prevProps) {
    //     // console.log("En update")
    //     let data = nextProps.route.params

    //     //if dont set params=undefined causes an error
    //     //when edit a group card and delete the same card
    //     //this because the params pased in EditGroup.js in function goToHome
    //     nextProps.route.params = undefined

    //     const editGroup = (params, prev) => {
    //         let auxGroups = prev.groups
    //         let limit = auxGroups.length
    //         let i
    //         for (i = 0; i < limit; i++) {
    //             if (auxGroups[i].id === params.id) {
    //                 break;
    //             }
    //         }

    //         auxGroups[i].name = params.newName
    //         auxGroups[i].imageID = params.newImageID

    //         return {
    //             groups: auxGroups
    //         }
    //     }

    //     //to update props (groups name only)
    //     if (data) {
    //         if (data.newName) {
    //             return editGroup(data, prevProps)
    //         }
    //         else {
    //             return null
    //         }
    //     }
    //     else {
    //         return null
    //     }
    // }

    /*aux funtions*/
    closeModalAddGroup() {
        let actual = this.state.showModalAddGroup
        this.setState({ showModalAddGroup: !actual, nameNewGroup: '' })
        this.forceUpdate
    }

    //go to
    goToTasks(id) {
        let auxGroups = this.state.groups
        let limit = auxGroups.length
        let i
        for (i = 0; i < limit; i++) {
            if (auxGroups[i].id === id) {
                break;
            }
        }
        this.props.navigation.navigate("Tasks Menu", auxGroups[i])
    }

    goToEdit(id) {
        let auxGroups = this.state.groups
        let limit = auxGroups.length
        let i
        for (i = 0; i < limit; i++) {
            if (auxGroups[i].id === id) {
                break;
            }
        }
        this.props.navigation.navigate("Edit Group", auxGroups[i])
    }

    //CRUD groups
    addGroup() {
        let actual = this.state.showModalAddGroup
        this.setState({ showModalAddGroup: !actual })
    }

    async createNewGroup(newName) {
        let auxGroups = this.state.groups
        let lastId = 0
        if (auxGroups.length > 0) {
            lastId = auxGroups[auxGroups.length - 1].id
        }

        let newGroup = {
            id: lastId + 1,
            name: newName,
            tasks: [],
            notes: [],
            imageID: 1,
        }

        auxGroups.push(newGroup)

        storeObjectData(dataGroupsKey, auxGroups)

        this.setState({ groups: auxGroups })
        this.closeModalAddGroup()
    }

    deleteGroup = (deleteID, callback) => {
        const d = async () => {
            let auxGroups = this.state.groups
            let i

            for (i = 0; i < auxGroups.length; i++) {
                if (auxGroups[i].id === deleteID) {
                    break
                }
            }
            auxGroups.splice(i, 1)

            storeObjectData(dataGroupsKey, auxGroups)

            await callback() //just to animated delet action

            setTimeout(() => {
                this.setState({ groups: auxGroups })
            }, 500)
        }

        Alert.alert(
            "Delete group",
            "This action can't be undone",
            [
                { text: "DELETE", onPress: d },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    }

    render() {
        //To pass functions to GroupCard as callbacks
        /*An altenative is to add each function you wanna pass
        to every GroupCard ->  function:this.funtionName
        It becomes everything complicated
        */
        const AuxGroupCard = ({ item }) => {
            return (
                <GroupCard
                    item={item}
                    deleteGroup={this.deleteGroup}
                    goToTasks={this.goToTasks}
                    goToEdit={this.goToEdit}
                />
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/**Add button */}
                <View style={styles.addBtn}>
                    <AddBtn action={this.addGroup} />
                </View>
                {/**Modal card add group */}
                {
                    this.state.showModalAddGroup ?
                        <AddGroup
                            close={this.closeModalAddGroup}
                            createNewGroup={this.createNewGroup}
                        /> :
                        null
                }

                {/* <Text>Total grupos: {this.state.groups.length}</Text> */}

                <View style={styles.page}>
                    <View style={styles.grupContainer}>
                        {
                            this.state.groups.length > 0 ?
                                <FlatList
                                    style={{ width: '100%', paddingTop: 0 }} //sin esto da problemas (probar)
                                    data={this.state.groups}
                                    numColumns={2}
                                    renderItem={AuxGroupCard}
                                    showsVerticalScrollIndicator={false}
                                /> :
                                <View>
                                    <Text style={styles.noGroupsText}>Yoy don't have any group :(</Text>
                                    <Character />
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        // backgroundColor: 'rgba(176, 177, 157, 0.0)'
        backgroundColor: 'white'
    },
    addBtn: {
        position: 'absolute',
        bottom: 30,
        right: 15,
        zIndex: 10
    },
    grupContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        height: '100%',
        width: '100%'
    },
    noGroupsText: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20
    }
})