import { Event, Page } from "./models";
import { Maybe } from "./types";

export interface CreatePageRequest {
  name: string;
}

export interface CreatePageResponse {
  uuid: string;
}

export interface GetPageResponse {
  page: Maybe<Page>;
}

export interface TriggerEventResponse {
  event: Event;
}
