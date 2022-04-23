import produce from "immer";
import { PageReducer } from "./types";

export const reducer: PageReducer = (state, action) => {
  console.log('pagereducer action', state, action)
  switch(action.type) {
    case 'SET_PAGE':
      return produce(state, draft => {
        draft.pages[action.page.uuid] = action.page
      })
    case 'ADD_EVENT':
      return produce(state, draft => {
        if (!draft.pages[action.uuid]) {
          return
        }
        draft.pages[action.uuid].events.unshift(action.event)
      })
    case 'SET_CURRENT_PAGE':
      return produce(state, draft => {
        draft.currentPage = action.uuid
      })
    case 'AUTH_PAGE':
      return produce(state, draft => {
        draft.auths[action.uuid] = action.expiry
      })
    case 'UNAUTH_PAGE':
      return produce(state, draft => {
        draft.auths[action.uuid] = null
      })
    default:
      return state
  }
}
