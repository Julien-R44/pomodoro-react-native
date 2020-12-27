import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { Picker } from '@react-native-community/picker'

export default class Settings extends React.Component {
  setModalVisibility(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  state = {
    modalVisible: true
  }

  renderTimeItems() {
    const items = []
    for (let i = 5; i < 55; i += 5) {
      items.push(<Picker.Item key={i} label={i.toString()} value={i} />)
    }
    return items
  }

  render() {
    return (
      <View>
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modalInnerContainer}>
              <View style={styles.modalTitleViewContainer}>
                <View style={styles.modalTitleView}>
                  <Text style={styles.modalTitle}>Settings</Text>
                  <TouchableOpacity
                    onPress={() => this.setModalVisibility(false)}
                  >
                    <Ionicons name="md-close-outline" size={35} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.settingsContainer}>
                <Text style={styles.settingTitle}>Time (minutes)</Text>

                <View style={styles.timesContainer}>
                  <Picker onValueChange={(value: any) => console.log(value)}>
                    {this.renderTimeItems()}
                  </Picker>
                  <Picker onValueChange={(value: any) => console.log(value)}>
                    {this.renderTimeItems()}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity onPress={() => this.setModalVisibility(true)}>
          <View style={styles.container}>
            <Ionicons name="md-settings-outline" size={35} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalInnerContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingBottom: 20,
    // paddingTop: 10,
    // alignItems: 'center',
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
    // padding: '0 10'
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  modalTitleViewContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  settingsContainer: {
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
    flexDirection: 'column'
  }
})
