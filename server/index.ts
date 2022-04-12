require('dotenv').config()
import express from 'express'
import { parse } from 'url'
import * as db from './lib/db'
import { log } from './lib/log'
import { prepareNextApp } from './lib/nextjs'

async function startServer() {
  const app = express()
  await db.connect()

  const nextApp = await prepareNextApp()
  const nextHandler = nextApp.getRequestHandler()
  
  app.get('/', (req, res) => {
    nextApp.render(req, res, '/index', parse(req.url, true).query)
  });

  app.get('*', (req, res) => {
    nextHandler(req, res, parse(req.url, true))
  })

  app.listen(process.env.PORT || 8080, () => {
    log('server started')
  })
}

startServer()
