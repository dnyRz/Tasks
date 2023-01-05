import { FlatList, Text, View, StyleSheet, BackHandler } from 'react-native'
import React, { Component } from 'react'

//Custom components
import TaskCard from './components/taskCard'
import SpeedDial from '../components/buttons/SpeedDial'

//storage
import { getObjectData, storeObjectData } from '../../storage/Storage'
import { dataGroupsKey } from '../../storage/keys'

export default class Task extends Component {
    constructor(props){
        super(props)
        this.state = {
            groupID: this.props.myRoute.route.params.id,
            name: this.props.myRoute.route.params.name,
            tasks: this.props.myRoute.route.params.tasks,
            hideStatus: 1
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.addTask = this.addTask.bind(this)
        this.goToEditTask = this.goToEditTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.showCompletedTaks = this.showCompletedTaks.bind(this)
    }

    async componentDidMount() {
        // console.log("CDM Task")
        // console.log(this.props.myRoute.route.params)
        // console.log(this.props.myRoute.navigation)
        //to update groups
        this.props.myRoute.navigation.addListener('focus', async()=>{
            console.log("Listener Focus Tasks")
            let data = await getObjectData(dataGroupsKey)
            let i, limit = data.length
            for (i = 0; i < limit; i++) {
                if (data[i].id == this.state.groupID) {
                    break
                }
            }
            this.setState({ tasks: data[i].tasks }) 
        })
        let data = await getObjectData(dataGroupsKey)
        let i, limit = data.length
        for(i=0; i<limit; i++){
            if(data[i].id == this.state.groupID){
                break
            }
        }
        this.setState({ tasks: data[i].tasks }) 


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    componentWillUnmount() {
        this.props.myRoute.navigation.removeListener('focus')
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    async handleBackButtonClick() {
        // const AsyncAlert = () => new Promise((resolve) => {
        //     Alert.alert(
        //         'Discard changes!',
        //         'This action will eliminate all changes',
        //         [
        //             {
        //                 text: "Continue editing!",
        //                 onPress: () => {  },
        //                 style: "cancel"
        //             },
        //             //This executes Main component did mount
        //             // { text: "OK", onPress: () => { this.props.navigation.replace("Main") } }
        //             { text: "OK", onPress: () => { this.props.navigation.goBack() } }
        //         ],
        //         { cancelable: true },
        //     );
        // });

        //ACTUALIZAR IR ATRAS
        //CON replace crea problemas (ver cabecera)

        // await AsyncAlert()
        this.props.myRoute.navigation.goBack()
        // this.props.myRoute.navigation.replace("Main")
        // console.log(this.props.myRoute.navigation)

        return true
    }

    async addTask(){
        let tasks = this.state.tasks
        let newID
        if(tasks.length>0){
            newID = tasks[tasks.length-1].id
        }
        else{
            newID = 0
        }

        let d = new Date()
        let auxDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()

        let newTask = {
            groupID: this.state.groupID,
            id: newID+1,
            status: 0, //0, 1, 2 ...
            name: 'New Task',
            description: '',
            date: auxDate
        }
        tasks.push(newTask)

        //storage
        let groups = await getObjectData(dataGroupsKey)
        let groupID = this.props.myRoute.route.params.id
        let i, limit = groups.length
        for(i=0; i<limit; i++){
            if(groups[i].id == groupID){
                break
            }
        }
        groups[i].tasks = tasks
        await storeObjectData(dataGroupsKey, groups)

        this.setState({tasks:tasks})
    }

    async deleteTask(id){
        let tasks = this.state.tasks
        let i, limit = tasks.length
        for(i=0; i<limit; i++){
            if(tasks[i].id==id){
                break
            }
        }
        tasks.splice(i, 1)

        let groups = await getObjectData(dataGroupsKey)
        let j
        limit = groups.length
        for(j=0; j<limit; j++){
            if(groups[j].id == this.state.groupID){
                break
            }
        }
        groups[j].tasks = tasks

        this.setState({tasks:tasks})
        await storeObjectData(dataGroupsKey, groups)
    }

    showCompletedTaks(){
        let aux = this.state.hideStatus==1?0:1
        this.setState({hideStatus:aux})
    }

    goToEditTask(id){
        let tasks = this.state.tasks
        let i, limit = tasks.length
        for(i=0; i<limit; i++){
            if(tasks[i].id==id){
                break
            }
        }

        this.props.myRoute.navigation.navigate("Edit Task", tasks[i])
    }

    render() {
        const AuxTaskCard = ({item}) => {
            // console.log("Aux task card")
            // console.log(item)

            if(this.state.hideStatus==1){//hide completed tasks
                if(item.status!=1){
                    return (
                        <TaskCard
                            item={item}
                            goToEditTask={this.goToEditTask}
                            deleteTask={this.deleteTask}
                        />
                    ) 
                }
                else{
                    return null
                }
            }
            else{//show only completed tasks
                if(item.status==1){
                    return (
                        <TaskCard
                            item={item}
                            goToEditTask={this.goToEditTask}
                            deleteTask={this.deleteTask}
                        />
                    ) 
                }
                else{
                    return null
                }
            }

            // if(item.status!=this.state.hideStatus){
            //     return(
            //         <TaskCard 
            //         item={item}
            //         goToEditTask={this.goToEditTask}
            //         />
            //     )
            // }
            // else{
            //     return null
            // }
        }

        return (
            <View style={styles.page}>

                <Text>{this.state.name}</Text>

                <FlatList 
                style={{ width: '100%', paddingTop:0 }} //sin esto da problemas (probar)
                data={this.state.tasks}
                numColumns={1}
                renderItem={AuxTaskCard}
                showsVerticalScrollIndicator={false}
                />

                <SpeedDial actionOne={this.addTask} actionTwo={this.showCompletedTaks}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        flex: 1
    }
})