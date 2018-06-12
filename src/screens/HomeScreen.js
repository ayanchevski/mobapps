import React from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'
import WeatherService from '../services/WeatherService'
import StorageService from '../services/StorageService'

export default class HomeScreen extends React.Component {
  state = {
    city: '',
    error: ''
  }

  componentDidMount = async () => {
    const city = await StorageService.getItem('city')

    if (city) {
      this.onCityInputTextChange(city)
    }
  }

  onCityInputTextChange = city => {
    this.setState({ city })
    this.setError('')
  }

  setError = error => {
    this.setState({ error })
  }

  onGetForecastPress = async () => {
    const { city } = this.state
    const { navigation } = this.props

    if (!city) {
      this.setError('Please enter a city.')
      return
    }

    const data = await WeatherService.getForecastWeather(city, 5)

    if (data) {
      navigation.navigate('ForecastScreen', {
        currentWeather: data.current,
        forecast: data.forecast.forecastday,
        location: data.location
      })
      StorageService.setItem('city', city)
    } else {
      this.setError('No forecast available for selected city.')
    }
  }

  render() {
    const { city, error } = this.state

    return (
      <View style={styles.container}>
        { error ? <Text>{error}</Text> : null }
        <TextInput
          placeholder='Enter city'
          style={styles.input}
          value={city}
          onChangeText={this.onCityInputTextChange}
        />
        <Button
          title='Get forecast'
          onPress={this.onGetForecastPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
})
