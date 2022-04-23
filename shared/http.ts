import { ClientPage, DateFormat, Event } from "./models";
import { RememberOptions } from "./time";
import { Maybe } from "./types";

export interface CreatePageRequest {
  name: string;
}

export interface CreatePageResponse {
  uuid: string;
}

export interface GetPageResponse {
  page: Maybe<ClientPage>;
}

export interface TriggerEventResponse {
  event: Event;
}

export interface TriggerEventRequest {
  note?: string;
}

export interface UuidParam {
  uuid: string;
}

export interface SetPasswordRequest {
  password: string;
}

export interface SetPasswordResponse {
  page: ClientPage;
}

export interface SubmitPasswordRequest {
  password: string;
  remember: RememberOptions;
}

export interface SubmitPasswordResponse {
  token: string;
}

export interface UpdatePageRequest {
  dateFormat: DateFormat;
}

export interface UpdatePageResponse {
  page: ClientPage;
}
