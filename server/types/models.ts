import { Document } from "bson";

export interface Event {
  date: Date;
}

export interface Page extends Document {
  created: Date;
  description: string;
  uuid: string;
  events: Array<Event>;
  key: string;
}
