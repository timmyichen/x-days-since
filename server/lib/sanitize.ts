import _ from 'lodash'
import { ClientPage, Page } from "@/shared/models";
import { WithId } from "mongodb";

export function sanitizePage(page: WithId<Page>): ClientPage {
  const { created, name, uuid, events } = page;
  return {
    created,
    name,
    uuid,
    events,
    meta: {
      hasPassword: !!page.settings.password,
      dateFormat: page.settings.dateFormat,
    },
  }
}
