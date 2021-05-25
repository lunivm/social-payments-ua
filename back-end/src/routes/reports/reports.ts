import express from 'express';
import { periodRouter } from './period/period';
import { cipherRouter } from './cipher/cipher';

const router = express.Router();

router.use('/period', periodRouter);
router.use('/cipher', cipherRouter);

export const reportsRouter = router;
