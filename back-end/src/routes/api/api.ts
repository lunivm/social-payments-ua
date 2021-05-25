import express from 'express';
import { financialInstitutionsRouter } from './financial-institutions/financial-institutions';
import { paymentsRouter } from './payments/payments';
import { personAccountsRouter } from './person-accounts/person-accounts';
import { personsRouter } from './persons/persons';
import { streetsRouter } from './streets/streets';
import { usersRouter } from './users/users';
import { codesKfkRouter } from './codes-kfk/codes-kfk';
import { codesKekRouter } from './codes-kek/codes-kek';
import { applicationSettingsRouter } from './application-settings/application-settings';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/payments', paymentsRouter);
router.use('/financial-institutions', financialInstitutionsRouter);
router.use('/persons', personsRouter);
router.use('/person-accounts', personAccountsRouter);
router.use('/streets', streetsRouter);
router.use('/codes-kfk', codesKfkRouter);
router.use('/codes-kek', codesKekRouter);
router.use('/settings', applicationSettingsRouter);

export const apiRouter = router;
