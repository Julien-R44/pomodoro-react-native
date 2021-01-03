import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { navigate } from 'RootNavigation'
// import Theme from 'style/theme'
import { useStateValue } from 'store/store'

export default function TabsSelector() {
  const [active, setActive] = useState(1)
  const { state, dispatch } = useStateValue()

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
            <Text style={styles.itemText}>pomodoro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress(2)}>
          <View style={[styles.item, active === 2 ? activeItem : []]}>
            <Text style={styles.itemText}>short break</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabPress(3)}>
          <View style={[styles.item, active === 3 ? activeItem : []]}>
            <Text style={styles.itemText}>long break</Text>
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
    fontFamily: 'NunitoSans_400Regular',
    paddingVertical: 5
  }
})
