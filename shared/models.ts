import { ObjectId } from "bson";

export interface Event {
  date: Date;
}

export interface Page {
  _id: ObjectId;
  created: Date;
  name: string;
  uuid: string;
  events: Array<Event>;
  key?: string;
}

export type ClientPage = Pick<Page, 'created' | 'name' | 'uuid' | 'events' | 'key' | '_id'>
