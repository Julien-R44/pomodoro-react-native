import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from 'components/base/BaseText'

interface props {
  label: string
}

export default function Picker({ label, children }: PropsWithChildren<props>) {
  return (
    <View style={styles.container}>
      <BaseText style={styles.label}>{label}</BaseText>
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
    textTransform: 'uppercase'
  }
})
