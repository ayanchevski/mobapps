import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import StorageService from '../services/StorageService'
import colors from '../constants/colors'

export default class SettingsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Settings'
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

  onTempSettingChange = async () => {
    const { tempSetting: currentTempSetting } = this.state
    const tempSetting = currentTempSetting === 'c' ? 'f' : 'c'

    StorageService.setItem('tempSetting', tempSetting)
    this.setState({ tempSetting })
  }

  onWindSettingChange = async () => {
    const { windSetting: currentWindSetting } = this.state
    const windSetting = currentWindSetting === 'kph' ? 'mph' : 'kph'

    StorageService.setItem('windSetting', windSetting)
    this.setState({ windSetting })
  }

  render() {
    const { tempSetting, windSetting } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.settingDescription}>
          <Text style={styles.settingText}>{`Current temp setting: ${tempSetting}`}</Text>
          <Button
            title={`Switch to ${tempSetting === 'c' ? 'F' : 'C'}`}
            onPress={this.onTempSettingChange}
          />
        </View>
        <View style={styles.settingDescription}>
          <Text style={styles.settingText}>{`Current wind setting: ${windSetting}`}</Text>
          <Button
            title={`Switch to ${windSetting === 'kph' ? 'mph' : 'kph'}`}
            onPress={this.onWindSettingChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingDescription: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  settingText: {
    fontSize: 15,
    color: colors.white,
    marginBottom: 10
  }
})
