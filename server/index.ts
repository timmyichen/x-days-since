require('dotenv').config()
import express from 'express'
import * as db from './lib/db'
import { log } from './lib/log'

async function startServer() {
  const app = express()
  await db.connect()
  app.listen(process.env.PORT || 8080, () => {
    log('server started')
  })
}

startServer()
