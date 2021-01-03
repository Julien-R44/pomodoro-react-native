import IAppState from './IAppState'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default (state: IAppState, action: any) => {
  console.log('WOH', action)
  if (action.type === 'CHANGE_THEME') {
    console.log('CHANGE THEME')
    const mainColor = {
      pink: '#DA81F8',
      blue: '#6FF2FB',
      red: '#F87071'
    }[action.themeName as 'pink' | 'blue' | 'red']

    state = {
      ...state,
      theme: { name: action.themeName, mainColor }
    }
    AsyncStorage.setItem('settings_theme', action.themeName)
    console.log('save', action.themeName)
  } else if (action.type === 'UPDATE_FONT') {
    state = { ...state, fontFamily: action.fontFamily }
  } else if (action.type === 'UPDATE_POMO_DURATION') {
    state = { ...state, pomodoroDuration: action.duration }
  } else if (action.type === 'UPDATE_SHORT_DURATION') {
    state = { ...state, shortDuration: action.duration }
  } else if (action.type === 'UPDATE_LONG_DURATION') {
    state = { ...state, longDuration: action.duration }
  } else if (action.type === 'UPDATE_SELECTED_TAB')
    state = { ...state, selectedTab: action.selectedTab }
  return state
}
