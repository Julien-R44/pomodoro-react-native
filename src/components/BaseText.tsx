import React from 'react'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { useStateValue } from 'store/store'

interface BaseTextProps {
  children: React.ReactNode
  weight?: 'light' | 'regular' | 'bold'
  style: StyleProp<TextStyle>
}

const BaseText: React.FC<BaseTextProps> = ({
  weight = 'regular',
  ...props
}) => {
  const {
    state: { fontFamily }
  } = useStateValue()

  const fontSuffix = {
    ['light']: '_200ExtraLight',
    ['regular']: '_400Regular',
    ['bold']: '_700Bold'
  }[weight]

  const styles = StyleSheet.create({
    text: { fontFamily: `${fontFamily + fontSuffix}` }
  })

  return <Text style={[styles.text, props.style]}>{props.children}</Text>
}

export default BaseText
