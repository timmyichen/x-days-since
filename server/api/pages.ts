import { CreatePageRequest, CreatePageResponse, GetPageResponse, SetPasswordRequest, SetPasswordResponse, SubmitPasswordRequest, SubmitPasswordResponse, TriggerEventResponse, UpdatePageRequest, UpdatePageResponse } from '@/shared/http'
import { RequestHandler } from 'express'
import { AsyncRouter } from 'express-async-router'
import { BadRequestError } from 'express-response-errors';
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { getPages } from '@/server/lib/db';
import { DateFormat } from '@/shared/models';
import { withPage, withPassword } from '@/server/middleware/withPage';
import { generatePageAuthToken, hashPassword } from '@/server/lib/auth';
import { sanitizePage } from '../lib/sanitize';
import { RememberOptions } from '@/shared/time';

const pagesRouter = AsyncRouter()
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

const setPassword: RequestHandler<unknown, SetPasswordResponse, SetPasswordRequest> = async (req, res) => {
  const page = req.page!
  const { password } = req.body

  if (!password) {
    throw new BadRequestError('A password is required')
  }

  if (page.settings.password) {
    throw new BadRequestError('Page is already password-protected')
  }

  const hashedPassword = await hashPassword(password)

  const updated = await getPages().findOneAndUpdate(
    { uuid: page.uuid },
    { $set: { 'settings.password': hashedPassword } },
    { returnDocument: 'after' }
  )

  res.send({ page: sanitizePage(updated.value!) })
}

const submitPassword: RequestHandler<unknown, SubmitPasswordResponse, SubmitPasswordRequest> = async (req, res) => {
  const page = req.page!
  const { password, remember } = req.body

  if (!password) {
    throw new BadRequestError('A password is required')
  }

  if (!(remember in RememberOptions)) {
    throw new BadRequestError('Invalid remember time period')
  }

  if (!page.settings.password) {
    throw new BadRequestError('A password is not required for this page')
  }

  const valid = bcrypt.compare(password, page.settings.password)

  if (!valid) {
    throw new BadRequestError('Incorrect password')
  }

  const token = generatePageAuthToken({ uuid: page.uuid, remember })
  res.json({ token })
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
pagesRouter.post('/:uuid/event', withPage(true), withPassword, triggerEvent)
pagesRouter.post('/:uuid/password', withPage(true), setPassword)
pagesRouter.post('/:uuid/auth', withPage(true), submitPassword)
pagesRouter.post('/:uuid/settings', withPage(true), withPassword, updatePage)

export default pagesRouter
