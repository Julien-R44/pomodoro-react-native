import IAppState from './IAppState'

export default (state: IAppState, action: any) => {
  if (action.type === 'CHANGE_THEME') {
    state = {
      ...state,
      theme: {
        name: action.themeName,
        mainColor: {
          pink: '#DA81F8',
          blue: '#6FF2FB',
          red: '#F87071'
        }[action.themeName as 'pink' | 'blue' | 'red']
      }
    }
  } else if (action.type === 'CHANGE_FONT') {
    state = { ...state, fontFamily: action.fontFamily }
  } else if (action.type === 'UPDATE_POMODORO_DURATION') {
    state = { ...state, pomodoroDuration: action.pomodoroDuration }
  }

  return state
}
