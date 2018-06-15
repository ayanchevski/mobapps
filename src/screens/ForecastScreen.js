import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CurrentWeather } from '../components'
import StorageService from '../services/StorageService'

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
  
  state = {
    tempSetting: 'c',
    windSetting: 'kph'
  }

  componentDidMount = async () => {
    const [[, tempSetting], [, windSetting]] = await StorageService.multiGet(['tempSetting', 'windSetting'])

    this.setState({ tempSetting: tempSetting || 'c' })
    this.setState({ windSetting: windSetting || 'kph' })
  }

  render() {
    const { navigation } = this.props
    const { tempSetting, windSetting } = this.state
    const location = navigation.getParam('location', null)
    const currentWeather = navigation.getParam('currentWeather', null)
    const forecast = navigation.getParam('forecast', null)

    return (
      <View style={styles.container}>
        {
          currentWeather
          ? <CurrentWeather
              currentWeather={currentWeather}
              forecast={forecast}
              tempSetting={tempSetting}
              windSetting={windSetting}
            />
          : <Text>No forecast</Text>
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
