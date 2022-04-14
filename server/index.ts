require('dotenv').config()
import express from 'express'
import { parse } from 'url'
import { responseErrorHandler } from 'express-response-errors'
import router from './api'
import * as db from './lib/db'
import { log } from './lib/log'
import cookieParser from 'cookie-parser'
import { prepareNextApp } from './lib/nextjs'
import initPageRoutes from './pages'

async function startServer() {
  const app = express()
  await db.connect()

  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const nextApp = await prepareNextApp()
  const nextHandler = nextApp.getRequestHandler()

  app.use('/api/', router)
  app.use('/ce', initPageRoutes(nextApp))

  app.get('/', (req, res) => {
    res.redirect('/ce')
  })

  app.get('*', (req, res) => {
    nextHandler(req, res, parse(req.url, true))
  })

  app.use(responseErrorHandler)

  app.listen(process.env.PORT || 8080, () => {
    log('server started')
  })
}

startServer()
