import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from 'components/SafeViewAndroid'
import Header from 'components/Header'
import PomoTimer from 'components/timer/PomoTimer'
import Settings from 'components/Settings'
import TabsSelector from 'components/TabsSelector'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
      <Header />
      <TabsSelector />
      <PomoTimer />
      <Settings />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2240'
  }
})
