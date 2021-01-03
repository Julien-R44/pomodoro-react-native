import React, { createContext, useContext, useReducer } from 'react'

interface AppState {
  theme: {
    name: string
    mainColor: string
  }
}

interface AppContext {
  state: AppState
  dispatch: React.Dispatch<any>
}

const initialState: AppState = {
  theme: {
    name: 'red',
    mainColor: '#F87071'
  }
}

const AppContext = createContext<AppContext>({
  state: initialState,
  dispatch: () => null
})

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: AppState, action: any) => {
    if (action.type === 'CHANGE_THEME') {
      state = {
        ...state,
        theme: {
          name: action.themeName,
          mainColor: {
            pink: '#DA81F8',
            blue: '#6FF2FB',
            red: '#F87071'
          }[action.themeName]
        }
      }
    }

    return state
  }, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

const useStateValue = () => useContext(AppContext)

export { AppContext, StateProvider, useStateValue }
