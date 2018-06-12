import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default class CurrentWeather extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  render() {
    const { currentWeather, temp, distance } = this.props
    const temperatureKey = temp === 'c' ? 'temp_c' : 'temp_f'
    const feelsLikeKey = temp === 'c' ? 'feelslike_c' : 'feelslike_f'

    return (
      <View style={styles.container}>
        <View style={styles.mainInfo}>
          <View style={styles.conditionInfo}>
            <Image source={{ uri: `http:${currentWeather.condition.icon}` }} style={styles.conditionImage} />
            <Text style={styles.conditionText}>{currentWeather.condition.text}</Text>
          </View>
          <View style={styles.degreesInfo}>
            <Text>{`${currentWeather[temperatureKey]}º${temp.toUpperCase()}`}</Text>
            <Text>{`Feels like: ${currentWeather[feelsLikeKey]}º${temp.toUpperCase()}`}</Text>
          </View>
        </View>
      </View>
    )
  }
}

CurrentWeather.defaultProps = {
  temp: 'c',
  distance: 'km'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  mainInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  conditionInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  conditionImage: { width: 50, height: 50 },
  conditionText: {
    fontSize: 20
  }
})
