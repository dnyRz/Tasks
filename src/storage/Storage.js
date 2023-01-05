import AsyncStorage from '@react-native-async-storage/async-storage';

const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log("ERROR EN STORAGE")
        //   console.log(e)
    }
}



export { storeObjectData, getObjectData }