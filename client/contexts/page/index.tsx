import { ClientPage } from '@/shared/models'
import React from 'react'
import { reducer } from './reducer'
import { PageDispatch, PageReducer, PageState } from './types'

const defaultState: PageState = {}

export const PageStateContext = React.createContext<PageState>(defaultState)
export const PageDispatchContext = React.createContext<PageDispatch>({} as PageDispatch)

interface Props {
  page?: ClientPage;
  children?: React.ReactNode;
}

export const PageContextProvider: React.FC<Props> = ({ children, page }) => {
  const [state, dispatch] = React.useReducer<PageReducer>(reducer, page ? { [page.uuid]: page } : {})

  return (
    <PageStateContext.Provider value={state}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageStateContext.Provider>
  )
}

export const usePageState = () => React.useContext(PageStateContext)
export const usePageDispatch = () => React.useContext(PageDispatchContext)
