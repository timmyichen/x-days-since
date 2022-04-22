import React from 'react'
import { ClientPage, Event } from "@/shared/models";

export interface PageState {
  pages: {
    [uuid: string]: ClientPage;
  };
  auths: {
    [uuid: string]: number | null;
  };
  currentPage?: string;
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
| {
  type: 'SET_CURRENT_PAGE';
  uuid: string;
}
| {
  type: 'AUTH_PAGE';
  uuid: string;
  expiry: number;
}
| {
  type: 'UNAUTH_PAGE';
  uuid: string;
}

export type PageReducer = React.Reducer<PageState, PageAction>
export type PageDispatch = React.Dispatch<PageAction>
