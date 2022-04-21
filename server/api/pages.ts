import { CreatePageRequest, CreatePageResponse, GetPageResponse, SetPasswordRequest, SubmitPasswordRequest, SubmitPasswordResponse, TriggerEventResponse, UpdatePageRequest, UpdatePageResponse } from '@/shared/http'
import express, { RequestHandler } from 'express'
import { BadRequestError, ForbiddenError } from 'express-response-errors';
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { getPages } from '@/server/lib/db';
import { DateFormat } from '@/shared/models';
import { withPage } from '@/server/middleware/withPage';
import { hashPassword } from '@/server/lib/auth';
import { sanitizePage } from '../lib/sanitize';

const pagesRouter = express.Router()
const DEFAULT_DATE_FORMAT = DateFormat.FULL_MINUTES

const createPage: RequestHandler<unknown, CreatePageResponse, CreatePageRequest> = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    throw new BadRequestError('')
  }

  const uuid = uuidv4()

  await getPages().insertOne({
    uuid,
    created: Date.now(),
    name,
    events: [],
    settings: {
      dateFormat: DEFAULT_DATE_FORMAT,
    }
  })

  res.json({ uuid })
}

const getPage: RequestHandler<unknown, GetPageResponse> = (req, res) => {
  const page = req.page

  if (!page) {
    return res.json({ page: null })
  }

  res.json({ page: sanitizePage(page) })
}

const triggerEvent: RequestHandler<unknown, TriggerEventResponse> = async (req, res) => {
  const { uuid } = req.page!

  const event = {
    date: Date.now()
  }
  
  await getPages().updateOne(
    { uuid },
    { $push: { events: event } }
  )

  res.send({ event })
}

const setPassword: RequestHandler<unknown, void, SetPasswordRequest> = async (req, res) => {
  const page = req.page!
  const { password } = req.body

  if (!password) {
    throw new BadRequestError('A password is required')
  }

  if (page.settings.password) {
    throw new BadRequestError('Page is already password-protected')
  }

  const hashedPassword = await hashPassword(password)

  await getPages().updateOne(
    { uuid: page.uuid },
    { $set: { 'settings.password': hashedPassword } }
  )

  res.send()
}

const submitPassword: RequestHandler<unknown, SubmitPasswordResponse, SubmitPasswordRequest> = async (req, res) => {
  const page = req.page!
  const { password } = req.body

  if (!password) {
    throw new BadRequestError('A password is required')
  }

  if (!page.settings.password) {
    throw new BadRequestError('A password is not required for this page')
  }

  const valid = bcrypt.compare(password, page.settings.password)

  if (!valid) {
    throw new BadRequestError('Incorrect password')
  }

  // do a thing
}

const updatePage: RequestHandler<unknown, UpdatePageResponse, UpdatePageRequest> = async (req, res) => {
  const page = req.page!
  const { dateFormat } = req.body

  if (!(dateFormat in DateFormat)) {
    throw new BadRequestError('Invalid date format')
  }

  const updated = await getPages().findOneAndUpdate(
    { uuid: page.uuid },
    { $set: { 'settings.dateFormat': dateFormat } },
    { returnDocument: 'after' }
  )
  
  res.json({ page: sanitizePage(updated.value!) })
}

pagesRouter.post('/', withPage(false), createPage)
pagesRouter.get('/:uuid', withPage(true), getPage)
pagesRouter.post('/:uuid/event', withPage(true), triggerEvent)
pagesRouter.post('/:uuid/password', withPage(true), setPassword)
pagesRouter.post('/:uuid/auth', withPage(true), submitPassword)
pagesRouter.post('/:uuid/settings', withPage(true), updatePage)

export default pagesRouter
