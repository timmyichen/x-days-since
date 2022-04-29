export interface Event {
  date: number;
  note?: string;
}

export const MAX_NOTE_LENGTH = 500

export enum DateFormat {
  DAYS_ONLY = "DAYS_ONLY", // X days
  FULL_MINUTES = "FULL_MINUTES", // full_days + M hours, N minutes
  FULL_SECONDS = "FULL_SECONDS", // full_minutes + O seconds
}

export interface Settings {
  password?: string;
  dateFormat: DateFormat;
  noPassword?: boolean;
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
    noPassword: boolean;
  }
}
