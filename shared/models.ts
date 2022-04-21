export interface Event {
  date: number;
}

export enum DateFormat {
  DAYS_ONLY = "DAYS_ONLY", // X days
  FULL_MINUTES = "FULL_MINUTES", // full_days + M hours, N minutes
  FULL_SECONDS = "FULL_SECONDS", // full_minutes + O seconds
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
