import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import colors from '../constants/colors'

const getDayOfWeek = timestamp => {
  const d = new Date(timestamp);
  var weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  return weekday[d.getDay()];
}

export default class CurrentWeather extends Component {
  renderForecast = ({ date, day }) => {
    const { temp, distance } = this.props
    const dayWeek = getDayOfWeek(date)
    const minTemperatureKey = temp === 'c' ? 'mintemp_c' : 'mintemp_f'
    const maxTemperatureKey = temp === 'c' ? 'maxtemp_c' : 'maxtemp_f'

    return (
      <View key={date} style={styles.forecastItemWrapper}>
        <View style={styles.forecastHeader}>
          <Text style={styles.forecastHeaderText}>{dayWeek}</Text>
        </View>
        <Image source={{ uri: `http:${day.condition.icon}` }} style={styles.forecastImage} />
        <Text style={styles.maxTemp}>{`${day[maxTemperatureKey]}º${temp.toUpperCase()}`}</Text>
        <Text style={styles.minTemp}>{`${day[minTemperatureKey]}º${temp.toUpperCase()}`}</Text>
        <Text style={styles.forecastText}>{day.condition.text}</Text>
      </View>
    )
  }

  render() {
    const { currentWeather, forecast, temp, distance } = this.props
    const temperatureKey = temp === 'c' ? 'temp_c' : 'temp_f'
    const windKey = distance === 'kph' ? 'wind_kph' : 'wind_mph'
    const date = new Date()
    const forecastDays = forecast.slice(1)

    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.smallHeader}>
            <Text style={styles.headerText}>{`Current conditions: ${date.toDateString()}`}</Text>
          </View>
          <View style={styles.mainInfo}>
            <View style={styles.degreesWrapper}>
              <Image source={{ uri: `http:${currentWeather.condition.icon}` }} style={styles.conditionImage} />
              <Text style={styles.degreeText}>{`${currentWeather[temperatureKey]}º${temp.toUpperCase()}`}</Text>
            </View>
            <Text style={styles.conditionText}>{currentWeather.condition.text}</Text>
            <View style={styles.additionalInfoWrapper}>
              <Text style={styles.additionalText}>{`Humidity: ${currentWeather.humidity}%`}</Text>
              <Text style={styles.additionalText}>{`Wind: ${currentWeather[windKey]}${distance}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.forecastWrapper}>
          {forecastDays.map(this.renderForecast)}
        </View>
      </View>
    )
  }
}

CurrentWeather.defaultProps = {
  temp: 'c',
  distance: 'kph'
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  mainInfoWrapper: {
    flex: 2
  },
  smallHeader: {
    alignSelf: 'stretch',
    backgroundColor: colors.smallHeaderBackground,
    paddingVertical: 10
  },
  headerText: {
    textAlign: 'center',
    color: colors.white
  },
  mainInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    padding: 30
  },
  degreesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  conditionText: {
    marginVertical: 20,
    fontSize: 30,
    color: colors.blueText,
    textAlign: 'center'
  },
  additionalInfoWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  additionalText: {
    color: colors.white,
    fontSize: 15,
    marginHorizontal: 10
  },
  conditionImage: { width: 100, height: 100 },
  degreeText: {
    fontSize: 50,
    color: colors.white
  },
  forecastWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  forecastItemWrapper: {
    flex: 1,
    backgroundColor: colors.forecastItemBackground,
    display: 'flex',
    alignItems: 'center'
  },
  forecastHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueTextDark
  },
  forecastHeaderText: {
    color: colors.blueTextDark
  },
  forecastImage: { width: 30, height: 30 },
  maxTemp: {
    color: colors.white
  },
  minTemp: {
    color: colors.silver_darker
  },
  forecastText: {
    color: colors.white,
    textAlign: 'center'
  }
})
