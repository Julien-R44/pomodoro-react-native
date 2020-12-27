import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Header extends Component {
  render() {
    return <Text style={styles.title}>pomoreact.</Text>
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'NunitoSans_700Bold',
    paddingTop: 45
  }
})
