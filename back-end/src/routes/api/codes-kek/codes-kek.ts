import express from 'express';
import { CodesKekController } from './codes-kek.controller';

const router = express.Router();

router.get('/', CodesKekController.getAll);

export const codesKekRouter = router;
