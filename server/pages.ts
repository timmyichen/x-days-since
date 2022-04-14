import express from 'express'
import { NextServer } from 'next/dist/server/next';
import { parse } from 'url'

function initPageRoutes(nextApp: NextServer) {
  const router = express.Router();

  router.get('/', (req, res) => {
    nextApp.render(req, res, '/index', parse(req.url, true).query)
  });

  router.get('/:uuid', (req, res) => {
    nextApp.render(req, res, '/page', { ...parse(req.url, true).query, uuid: req.params.uuid })
  });

  return router
}

export default initPageRoutes
