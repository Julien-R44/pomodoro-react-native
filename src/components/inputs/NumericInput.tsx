import React, { useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BaseText from '@components/BaseText'

interface NumericInputProps {
  value?: string
  onChangeText?: (value: string) => void
  label: string
  style?: Record<string, unknown>
}

export default function NumericInput(props: NumericInputProps) {
  const { label, style = {}, onChangeText } = props
  const [inputValue, setInputValue] = useState(props.value || '0')

  const onChevronPress = (increment: number) => {
    const newValue = (+inputValue + increment).toString()
    setInputValue(newValue)
    onChangeText && onChangeText(newValue)
  }

  return (
    <View style={[styles.container, style]}>
      <BaseText style={styles.label}>{label}</BaseText>
      <View style={styles.inputContainer}>
        <TextInput
          value={props.value}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={props.onChangeText}
          keyboardType="numeric"
          editable={false}
        />
        <View style={styles.chevronsContainer}>
          <TouchableOpacity onPress={() => onChevronPress(5)}>
            <Ionicons name="chevron-up" size={15} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChevronPress(-5)}>
            <Ionicons name="chevron-down" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#d0cfd3'
  },
  inputContainer: {
    backgroundColor: '#EEF1FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 5
  },
  input: {
    width: 55,
    textAlign: 'center',
    fontFamily: 'NunitoSans_700Bold'
  },
  chevronsContainer: {
    marginRight: 10
  }
})
