import { UuidParam } from "@/shared/http"
import { RequestHandler } from "express"
import { BadRequestError, NotFoundError } from "express-response-errors"
import { validate as validate } from 'uuid';
import { getPages } from "@/server/lib/db";

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
