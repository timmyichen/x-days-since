import React from 'react'
import { ClientPage, Event } from "@/shared/models";

export interface PageState {
  [uuid: string]: ClientPage;
}

export type PageAction =
| {
  type: 'SET_PAGE';
  page: ClientPage;
}
| {
  type: 'ADD_EVENT';
  uuid: string;
  event: Event;
}

export type PageReducer = React.Reducer<PageState, PageAction>
export type PageDispatch = React.Dispatch<PageAction>
