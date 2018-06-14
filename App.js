import React from 'react'
import { HomeScreen, SettingsScreen, ForecastScreen } from './src/screens'
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
    SettingsScreen: {
      screen: SettingsScreen
    },
    ForecastScreen: {
      screen: ForecastScreen
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.black
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
