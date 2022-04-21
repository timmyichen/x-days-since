import produce from "immer";
import { SnackReducer } from "./types";

export const reducer: SnackReducer = (state, action) => {
  console.log('snackreducer action', action)
  switch(action.type) {
    case 'SET_SNACK':
      return produce(state, draft => {
        draft.snack = action.snack
      })
    default:
      return state
  }
}
