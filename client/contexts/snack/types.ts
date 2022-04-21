import React from 'react'

export interface Snack {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success'
}

export interface SnackState {
  snack?: Snack
}

export type SnackAction =
| {
  type: 'SET_SNACK';
  snack: Snack;
}

export type SnackReducer = React.Reducer<SnackState, SnackAction>
export type SnackDispatch = React.Dispatch<SnackAction>
