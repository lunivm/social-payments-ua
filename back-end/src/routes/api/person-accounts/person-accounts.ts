import express from 'express';
import { PersonAccountsController } from './person-accounts.controller';

const router = express.Router();

router.get('/', PersonAccountsController.getAll);

export const personAccountsRouter = router;