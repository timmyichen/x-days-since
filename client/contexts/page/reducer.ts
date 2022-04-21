import produce from "immer";
import { PageReducer } from "./types";

export const reducer: PageReducer = (state, action) => {
  console.log('pagereducer action', action)
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
        draft.pages[action.uuid].events.push(action.event)
      })
    case 'SET_CURRENT_PAGE':
      return produce(state, draft => {
        draft.currentPage = action.uuid
      })
    default:
      return state
  }
}
