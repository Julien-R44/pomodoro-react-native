import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface props {
  label: string
}

export default function Picker({ label, children }: PropsWithChildren<props>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans_700Bold'
  }
})
