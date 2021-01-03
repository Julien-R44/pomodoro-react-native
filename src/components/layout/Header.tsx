import React from 'react'
import { StyleSheet } from 'react-native'
import BaseText from 'components/base/BaseText'

export default function Header() {
  return <BaseText style={styles.title}>pomoreact.</BaseText>
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 25
  }
})
