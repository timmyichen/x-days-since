import express from 'express'
import pagesRouter from './pages';

const router = express.Router();

router.use('/pages', pagesRouter)

export default router
