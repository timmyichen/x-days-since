import { UuidParam } from "@/shared/http"
import { RequestHandler } from "express"
import { BadRequestError, NotFoundError, UnauthorizedError } from "express-response-errors"
import { validate as validate } from 'uuid';
import { getPages } from "@/server/lib/db";
import { verifyPageAuthToken } from "../lib/auth";

export const withPage = (required = true): RequestHandler<UuidParam> => async (req, res, next) => {
  const { uuid } = req.params

  if (!required && !uuid) {
    return next();
  }

  if (!uuid || !validate(uuid)) {
    throw new BadRequestError('Invalid UUID')
  }

  const page = await getPages().findOne({ uuid })

  if (!page) {
    throw new NotFoundError('Page not found')
  }

  req.page = page || undefined;

  next()
}

export const withPassword: RequestHandler<UuidParam> = async (req, res, next) => {
  const page = req.page!

  if (page.settings.password) {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new UnauthorizedError('Missing password')
    }

    const validPassword = verifyPageAuthToken({ expectedUuid: page.uuid, token })

    if (!validPassword) {
      throw new UnauthorizedError('Incorrect password')
    }
  }

  next()
}
