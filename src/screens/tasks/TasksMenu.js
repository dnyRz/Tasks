import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import Task from './Task';
import Notes from './Notes';

const Tab = createMaterialTopTabNavigator();

function TasksMenu(params) {
  // console.log(params)

  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks"
      // component={Task}
      children={()=><Task 
      myRoute={params}
      />}
      />
      <Tab.Screen name="Notes" component={Notes} />
    </Tab.Navigator>
  );
}

export default TasksMenu