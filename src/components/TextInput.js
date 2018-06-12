import React, { Component } from 'react'
import { TextInput } from 'react-native'

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  render() {
    const { placeholder } = this.props
  
    return (
      <TextInput
        style={style}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
        placeholder={placeholder}
      />
    )
  }
}

const style = {
  height: 40,
  width: 200,
  borderColor: 'gray',
  borderWidth: 1
}
