import React from 'react'
import {
  NunitoSans_200ExtraLight,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  Montserrat_200ExtraLight,
  Montserrat_400Regular,
  Montserrat_700Bold,
  RobotoSlab_200ExtraLight,
  RobotoSlab_400Regular,
  RobotoSlab_700Bold,
  useFonts
} from '@expo-google-fonts/dev'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'screens/Home'
import { StateProvider } from 'store/store'

const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
    Montserrat_200ExtraLight,
    Montserrat_400Regular,
    Montserrat_700Bold,
    RobotoSlab_200ExtraLight,
    RobotoSlab_400Regular,
    RobotoSlab_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  )
}
