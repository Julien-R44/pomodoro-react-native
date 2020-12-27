import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import {
  NunitoSans_200ExtraLight,
  NunitoSans_400Regular,
  NunitoSans_700Bold
} from '@expo-google-fonts/dev'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import SafeViewAndroid from './components/SafeViewAndroid'
import Header from './components/Header'
import PomoTimer from './components/timer/PomoTimer'

export default class App extends Component {
  state = {
    fontsLoaded: false
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      NunitoSans_200ExtraLight,
      NunitoSans_400Regular,
      NunitoSans_700Bold
    })
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    }
    return (
      <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
        <Header />
        <PomoTimer />
        <StatusBar style="light" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2240'
  }
})
