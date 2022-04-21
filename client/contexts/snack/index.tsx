import React from 'react'
import { reducer } from './reducer'
import { SnackDispatch, SnackReducer, SnackState } from './types'

const defaultState: SnackState = { snack: undefined }

export const SnackStateContext = React.createContext<SnackState>(defaultState)
export const SnackDispatchContext = React.createContext<SnackDispatch>({} as SnackDispatch)

interface Props {
  children?: React.ReactNode;
}

export const SnackContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer<SnackReducer>(reducer, defaultState)

  return (
    <SnackStateContext.Provider value={state}>
      <SnackDispatchContext.Provider value={dispatch}>
        {children}
      </SnackDispatchContext.Provider>
    </SnackStateContext.Provider>
  )
}

export const useSnackState = () => React.useContext(SnackStateContext)
export const useSnackDispatch = () => React.useContext(SnackDispatchContext)
