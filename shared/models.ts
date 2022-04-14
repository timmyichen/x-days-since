import { Document } from "bson";

export interface Event {
  date: Date;
}

export interface Page extends Document {
  created: Date;
  name: string;
  uuid: string;
  events: Array<Event>;
  key?: string;
}
