import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import NumericInput from '@components/inputs/NumericInput'
import Delimiter from 'components/layout/Delimiter'
import FontPicker from '@components/settings/FontPicker'
import ColorPicker from '@components/settings/ColorPicker'
import { useStateValue } from 'store/store'
import BaseText from 'components/base/BaseText'

export default function Settings() {
  const [modalVisible, setModalVisible] = useState(false)
  const [pomoDuration, setPomoDuration] = useState('25')
  const [shortDuration, setShortDuration] = useState('5')
  const [longDuration, setLongDuration] = useState('40')
  const { dispatch } = useStateValue()

  const onDurationUpdate = (
    typeAction: string,
    newDuration: string,
    setStateAction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setStateAction(newDuration)
    dispatch({
      type: typeAction,
      duration: newDuration
    })
  }

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalTitleViewContainer}>
              <View style={styles.modalTitleView}>
                <BaseText style={styles.modalTitle}>Settings</BaseText>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="md-close-outline" size={35} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingsContainer}>
              <BaseText style={styles.settingTitle}>Time (minutes)</BaseText>

              <View style={styles.timesContainer}>
                <NumericInput
                  value={pomoDuration}
                  onChangeText={(newDuration) =>
                    onDurationUpdate(
                      'UPDATE_POMO_DURATION',
                      newDuration,
                      setPomoDuration
                    )
                  }
                  style={styles.timeInput}
                  label="pomodoro"
                />
                <NumericInput
                  value={shortDuration}
                  onChangeText={(newDuration) =>
                    onDurationUpdate(
                      'UPDATE_SHORT_DURATION',
                      newDuration,
                      setShortDuration
                    )
                  }
                  style={styles.timeInput}
                  label="short break"
                />
                <NumericInput
                  value={longDuration}
                  onChangeText={(newDuration) =>
                    onDurationUpdate(
                      'UPDATE_LONG_DURATION',
                      newDuration,
                      setLongDuration
                    )
                  }
                  label="long break"
                />
              </View>

              <Delimiter />

              <FontPicker />

              <Delimiter />

              <ColorPicker />
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Ionicons name="md-settings-sharp" size={35} color="grey" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center'
    // alignItems: 'center'
    // width: '100%'
  },

  modalInnerContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTitle: {
    fontSize: 25
  },
  modalTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  modalTitleViewContainer: {
    borderBottomColor: '#d0cfd3',
    borderBottomWidth: 1
  },
  settingsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20
  },
  settingTitle: {
    fontSize: 12,
    letterSpacing: 4,
    marginTop: 10,
    textTransform: 'uppercase'
  },
  timesContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  timeInput: {
    marginRight: 25
  }
})
