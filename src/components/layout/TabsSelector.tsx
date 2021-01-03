import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useStateValue } from 'store/store'
import BaseText from 'components/base/BaseText'

export default function TabsSelector() {
  const [active, setActive] = useState('pomo')
  const { state, dispatch } = useStateValue()

  const onTabPress = (tabId: string) => {
    setActive(tabId)
    dispatch({ type: 'UPDATE_SELECTED_TAB', selectedTab: tabId })
  }

  const activeItem = {
    backgroundColor: state.theme.mainColor,
    borderRadius: 50
  }

  return (
    <View style={{ alignSelf: 'center' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onTabPress('pomo')}>
          <View style={[styles.item, active === 'pomo' ? activeItem : []]}>
            <BaseText weight="light" style={styles.itemText}>
              pomodoro
            </BaseText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress('short')}>
          <View style={[styles.item, active === 'short' ? activeItem : []]}>
            <BaseText weight="light" style={styles.itemText}>
              short break
            </BaseText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress('long')}>
          <View style={[styles.item, active === 'long' ? activeItem : []]}>
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
