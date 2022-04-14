import { CreatePageRequest, CreatePageResponse, GetPageResponse } from '@/shared/http'
import express, { RequestHandler } from 'express'
import { BadRequestError, NotFoundError } from 'express-response-errors';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { getPages } from '@/server/lib/db';

const pagesRouter = express.Router()

const createPage: RequestHandler<unknown, CreatePageResponse, CreatePageRequest> = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    throw new BadRequestError('')
  }

  const uuid = uuidv4()

  await getPages().insertOne({
    uuid,
    created: new Date(),
    name,
    events: [],
  })

  res.json({ uuid })
}

const getPage: RequestHandler<{ uuid: string }, GetPageResponse> = async (req, res) => {
  const uuid = req.params.uuid

  if (!uuid || !validateUuid(uuid)) {
    throw new BadRequestError('Invalid UUID')
  }

  const page = await getPages().findOne({ uuid })

  res.json({ page })
}

const triggerEvent: RequestHandler<{ uuid: string }> = async (req, res) => {
  const uuid = req.params.uuid

  if (!uuid || !validateUuid(uuid)) {
    throw new BadRequestError('Invalid UUID')
  }

  const event = {
    date: new Date()
  }
  
  await getPages().updateOne(
    { uuid },
    { $push: { events: event } }
  )

  res.send()
}

pagesRouter.post('/', createPage)
pagesRouter.get('/:uuid', getPage)
pagesRouter.post('/:uuid/event', triggerEvent)

export default pagesRouter
