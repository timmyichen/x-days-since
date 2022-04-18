import produce from "immer";
import { PageReducer } from "./types";

export const reducer: PageReducer = (state, action) => {
  console.log('pagereducer action', action)
  switch(action.type) {
    case 'SET_PAGE':
      return produce(state, draft => {
        draft[action.page.uuid] = action.page;
      })
    case 'ADD_EVENT':
      return produce(state, draft => {
        if (!draft[action.uuid]) {
          return
        }
        draft[action.uuid].events.push(action.event)
      })
    default:
      return state
  }
}
