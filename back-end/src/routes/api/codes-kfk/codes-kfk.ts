import express from 'express';
import { CodesKfkController } from './codes-kfk.controller';

const router = express.Router();

router.get('/', CodesKfkController.getAll);

export const codesKfkRouter = router;
