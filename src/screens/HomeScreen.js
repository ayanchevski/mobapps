import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native'
import WeatherService from '../services/WeatherService'
import StorageService from '../services/StorageService'
import colors from '../constants/colors'

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
      <View style={styles.container} enabled>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Weather App</Text>
        </View>
        <View style={styles.controlsWrapper}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            placeholder='Enter city'
            style={styles.input}
            value={city}
            onChangeText={this.onCityInputTextChange}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.onGetForecastPress}
          >
            <Text style={styles.buttonText}>Get forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onGetForecastPress}
          >
            <Text style={styles.buttonText}>Go to settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headingWrapper: {
    paddingVertical: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    color: colors.white,
    fontSize: 30
  },
  controlsWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    fontSize: 14,
    color: colors.red
  },
  input: {
    height: 60,
    width: 250,
    paddingHorizontal: 10,
    borderColor: colors.white,
    borderWidth: 1,
    color: colors.white,
    fontSize: 18,
    marginBottom: 15
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 250,
    marginTop: 15,
    backgroundColor: colors.blueTextDark
  },
  buttonText: {
    fontSize: 14,
    color: colors.white
  }
})
