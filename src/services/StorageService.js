import { AsyncStorage } from 'react-native'

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)

    return null
  }
}

const multiGet = async keys => {
  try {
    const values = await AsyncStorage.multiGet(keys)

    return values
  } catch (error) {
    console.log(error)

    return null
  }
}

export default {
  setItem,
  getItem,
  multiGet
}
