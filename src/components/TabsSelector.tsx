import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { navigate } from 'RootNavigation'
import { useStateValue } from 'store/store'
import BaseText from '@components/BaseText'

export default function TabsSelector() {
  const [active, setActive] = useState(1)
  const { state } = useStateValue()

  const onTabPress = (tabId: number) => {
    setActive(tabId)
    navigate('ShortBreak')
  }

  const activeItem = {
    backgroundColor: state.theme.mainColor,
    borderRadius: 50
  }

  return (
    <View style={{ alignSelf: 'center' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onTabPress(1)}>
          <View style={[styles.item, active === 1 ? activeItem : []]}>
            <BaseText weight="light" style={styles.itemText}>
              pomodoro
            </BaseText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress(2)}>
          <View style={[styles.item, active === 2 ? activeItem : []]}>
            <BaseText weight="light" style={styles.itemText}>
              short break
            </BaseText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress(3)}>
          <View style={[styles.item, active === 3 ? activeItem : []]}>
            <BaseText weight="light" style={styles.itemText}>
              long break
            </BaseText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'center',
    marginTop: 35,
    backgroundColor: '#0a0d19',
    borderRadius: 50,
    padding: 0
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50
  },
  itemText: {
    color: 'white',
    paddingVertical: 5
  }
})
