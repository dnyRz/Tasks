import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Splash from '../screens/general/Splash';
import Signin from '../screens/general/Signin';
import Main from '../screens/group/Main';
import EditGroup from '../screens/group/EditGroup';
import Task from '../screens/tasks/Task';
import EditTask from '../screens/tasks/EditTask';

import TasksMenu from '../screens/tasks/TasksMenu';

//Custom styles
import { MainTitle } from './styles/Styles';

const Stack = createNativeStackNavigator();

function Menu() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    // options={{
                    //     title: 'My Groups',
                    //     headerStyle: {
                    //         backgroundColor: 'tomato',
                    //     },
                    //     headerTintColor: '#fff',
                    //     headerTitleStyle: {
                    //         fontWeight: 'bold',
                    //     },
                    //     headerTitleAlign: 'center'
                    // }}
                    options={{
                        headerTitle: (props) => <MainTitle {...props} />,
                        headerStyle: {
                            //backgroundColor: 'rgba(0,0,0,0.5)',
                            backgroundColor: '#686868',
                        },
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name="Edit Group"
                    component={EditGroup}
                    options={{
                        headerBackVisible: false
                    }}
                />
                <Stack.Screen
                    name="Task"
                    component={Task}
                />
                <Stack.Screen
                    name="Edit Task"
                    component={EditTask}
                />
                <Stack.Screen
                    name="Tasks Menu"
                    component={TasksMenu}
                    options={{
                        // headerBackVisible: false,
                        headerShown:false,
                    //     headerTintColor: 'black',
                    //     headerTitleStyle: {
                    //         fontWeight: 'bold',
                    //     },
                    //     headerTitleAlign: 'center'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Menu;