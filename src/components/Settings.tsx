import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native'
import NumericInput from '@components/inputs/NumericInput'
import Delimiter from '@components/Delimiter'
import FontPicker from '@components/settings/FontPicker'
import ColorPicker from '@components/settings/ColorPicker'
import { useStateValue } from 'store/store'

export default function Settings() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalTitleViewContainer}>
              <View style={styles.modalTitleView}>
                <Text style={styles.modalTitle}>Settings</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="md-close-outline" size={35} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingsContainer}>
              <Text style={styles.settingTitle}>Time (minutes)</Text>

              <View style={styles.timesContainer}>
                <NumericInput style={styles.timeInput} label="pomodoro" />
                <NumericInput style={styles.timeInput} label="short break" />
                <NumericInput label="long break" />
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
    fontSize: 25,
    fontFamily: 'NunitoSans_700Bold'
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
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans_700Bold'
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
