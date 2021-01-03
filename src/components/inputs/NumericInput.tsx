import React, { useState } from 'react'
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BaseText from '@components/BaseText'

interface props {
  label: string
  style?: Record<string, unknown>
}

export default function NumericInput({ label, style = {} }: props) {
  const [inputValue, setInputValue] = useState('25')

  const onChevronPress = (increment: number) => {
    setInputValue((+inputValue + increment).toString())
  }

  return (
    <View style={[styles.container, style]}>
      <BaseText style={styles.label}>{label}</BaseText>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputValue}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
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
