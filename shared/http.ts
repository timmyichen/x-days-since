import { ClientPage, Event } from "./models";
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

export interface UuidParam {
  uuid: string;
}

export interface SetPasswordRequest {
  password: string;
}

export interface SubmitPasswordRequest {
  password: string;
  remember: RememberOptions;
}

export interface SubmitPasswordResponse {
  token: string;
}
