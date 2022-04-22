import { ClientPage } from '@/shared/models'
import React from 'react'
import { reducer } from './reducer'
import { PageDispatch, PageReducer, PageState } from './types'

const defaultState: PageState = {
  pages: {},
  auths: {},
}

export const PageStateContext = React.createContext<PageState>(defaultState)
export const PageDispatchContext = React.createContext<PageDispatch>({} as PageDispatch)

interface Props {
  page?: ClientPage;
  pageUuid?: string;
  children?: React.ReactNode;
}

export const PageContextProvider: React.FC<Props> = ({ children, page, pageUuid }) => {
  const [state, dispatch] = React.useReducer<PageReducer>(
    reducer,
    page ? {
      ...defaultState,
      pages: { [page.uuid]: page },
      currentPage: pageUuid
    } : defaultState
  )

  React.useEffect(() => {
    if (page) {
      dispatch({ type: 'SET_PAGE', page })
    }
  }, [page])

  React.useEffect(() => {
    if (pageUuid) {
      dispatch({ type: 'SET_CURRENT_PAGE', uuid: pageUuid })
    }
  }, [pageUuid])

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
