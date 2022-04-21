export interface Event {
  date: number;
}

export enum DateFormat {
  DAYS_ONLY = "days_only",
  FULL_DAYS = "full_days",
  FULL_MINUTES = "full_minutes",
  FULL_SECONDS = "full_seconds",
}

export interface Settings {
  password?: string;
  dateFormat: DateFormat;
}

export interface Page {
  created: number;
  name: string;
  uuid: string;
  events: Array<Event>;
  settings: Settings;
}

export type ClientPage = Pick<Page, 'created' | 'name' | 'uuid' | 'events'> & {
  meta: {
    hasPassword: boolean;
    dateFormat: DateFormat;
  }
}
