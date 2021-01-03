import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Picker from '@components/settings/Picker'
import { Ionicons } from '@expo/vector-icons'
import { useStateValue } from 'store/store'

export default function FontPicker() {
  const { state, dispatch } = useStateValue()

  const activeFont = state.fontFamily

  const onFontPress = (fontFamily: string) => {
    dispatch({ type: 'CHANGE_FONT', fontFamily })
  }

  return (
    <Picker label="Font">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onFontPress('NunitoSans')}>
          <View
            style={[
              styles.selector,
              activeFont === 'NunitoSans' && styles.activeSelector
            ]}
          >
            <Text
              style={[
                styles.nunito,
                styles.baseText,
                activeFont === 'NunitoSans' && styles.activeText
              ]}
            >
              Aa
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFontPress('Montserrat')}>
          <View
            style={[
              styles.selector,
              activeFont === 'Montserrat' && styles.activeSelector
            ]}
          >
            <Text
              style={[
                styles.montserrat,
                styles.baseText,
                activeFont === 'Montserrat' && styles.activeText
              ]}
            >
              Aa
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFontPress('RobotoSlab')}>
          <View
            style={[
              styles.selector,
              activeFont === 'RobotoSlab' && styles.activeSelector
            ]}
          >
            <Text
              style={[
                styles.roboto,
                styles.baseText,
                activeFont === 'RobotoSlab' && styles.activeText
              ]}
            >
              Aa
            </Text>
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
    alignItems: 'center',
    backgroundColor: '#EEF1FA'
  },
  activeSelector: {
    backgroundColor: '#0E101F'
  },
  activeText: {
    color: 'white'
  },
  nunito: {
    fontFamily: 'NunitoSans_400Regular'
  },
  montserrat: {
    fontFamily: 'Montserrat_400Regular'
  },
  roboto: {
    fontFamily: 'RobotoSlab_400Regular'
  },
  baseText: {
    color: 'black',
    fontSize: 19
  }
})
