import React, { Component } from 'react'
import {
  NunitoSans_200ExtraLight,
  NunitoSans_400Regular,
  NunitoSans_700Bold
} from '@expo-google-fonts/dev'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'screens/Home'

const Stack = createStackNavigator()

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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
