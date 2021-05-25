import express from 'express';
import { PersonsController } from './persons.controller';

const router = express.Router();

router.get('/', PersonsController.getAll);

export const personsRouter = router;