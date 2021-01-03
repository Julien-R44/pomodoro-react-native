import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from 'components/layout/SafeViewAndroid'
import Header from 'components/layout/Header'
import PomoTimer from 'components/timer/PomoTimer'
import Settings from 'screens/Settings'
import TabsSelector from 'components/layout/TabsSelector'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { useStateValue } from 'store/store'

export default function Home() {
  const {
    state: { selectedTab }
  } = useStateValue()

  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        start={{ x: 0, y: 0.1 }}
        style={{
          flex: 1
        }}
      >
        <Header />
        <TabsSelector />
        <PomoTimer selectedTab={selectedTab} />
        <Settings />
        <StatusBar style="light" />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2240'
  }
})
