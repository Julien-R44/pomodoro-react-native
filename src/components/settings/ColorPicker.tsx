import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Picker from '@components/settings/Picker'
import { Ionicons } from '@expo/vector-icons'
import { useStateValue } from 'store/store'
import { AppContext } from 'store/store'

export default function FontPicker() {
  const { state, dispatch } = useContext(AppContext)
  const { theme } = state

  const onColorPress = (colorThemeName: string) => {
    dispatch({
      type: 'CHANGE_THEME',
      themeName: colorThemeName
    })
  }

  return (
    <Picker label="Color">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onColorPress('red')}>
          <View style={[styles.red, styles.selector]}>
            {theme.name === 'red' && <Ionicons name="checkmark" size={15} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onColorPress('blue')}>
          <View style={[styles.blue, styles.selector]}>
            {theme.name === 'blue' && <Ionicons name="checkmark" size={15} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onColorPress('pink')}>
          <View style={[styles.pink, styles.selector]}>
            {theme.name === 'pink' && <Ionicons name="checkmark" size={15} />}
          </View>
        </TouchableOpacity>
      </View>
    </Picker>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  selector: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pink: { backgroundColor: '#DA81F8' },
  blue: { backgroundColor: '#6FF2FB' },
  red: { backgroundColor: '#F87071' }
})
