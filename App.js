import React from 'react'
import { HomeScreen, CurrentWeatherScreen, ForecastScreen } from './src/screens'
import colors from './src/constants/colors'
import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    CurrentWeatherScreen: {
      screen: CurrentWeatherScreen
    },
    ForecastScreen: {
      screen: ForecastScreen
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.white_two
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
