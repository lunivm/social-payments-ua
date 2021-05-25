import express from 'express';
import { StreetsController } from './streets.controller';

const router = express.Router();

router.get('/', StreetsController.getAll);

export const streetsRouter = router;