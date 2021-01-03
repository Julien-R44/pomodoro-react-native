import React, { createContext, useContext, useReducer } from 'react'
import IAppState from './IAppState'
import reducer from './reducer'

const initialState: IAppState = {
  theme: {
    name: 'red',
    mainColor: '#F87071'
  },
  fontFamily: 'NunitoSans',
  pomodoroDuration: 25
}

interface AppContext {
  state: IAppState
  dispatch: React.Dispatch<any>
}

const AppContext = createContext<AppContext>({
  state: initialState,
  dispatch: () => null
})

const StateProvider: React.FC = ({
  children
}: {
  children?: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

const useStateValue = () => useContext(AppContext)

export { AppContext, StateProvider, useStateValue }
