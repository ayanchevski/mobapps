import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class ForecastScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const location = navigation.getParam('location', null)
    let title = 'Forecast'

    if (location) {
      title = `${location.name}, ${location.country}`
    }

    return {
      title
    }
  }

  render() {
    const { navigation } = this.props
    const location = navigation.getParam('location', null)
    const currentWeather = navigation.getParam('currentWeather', null)
    console.log(location)
    return (
      <View style={styles.container}>
        {
          currentWeather ? <Text>Forecast</Text> : <Text>No forecast</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
