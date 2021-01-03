import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Delimiter() {
  return <View style={styles.delimiter}></View>
}

const styles = StyleSheet.create({
  delimiter: {
    borderBottomColor: '#d0cfd3',
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20
  }
})
