import { MongoClient } from "mongodb"
import { Page } from "@/server/types/models";
import { log } from "./log";

if (!process.env.MONGO_URI) {
  throw new Error('expected mongo URI')
}

const client = new MongoClient(process.env.MONGO_URI)

export async function connect() {
  await client.connect();
  log('connected to mongodb')
}

export function getPages() {
  return client.db('pages').collection<Page>('pages')
}
