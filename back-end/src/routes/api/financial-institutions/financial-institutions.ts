import express from 'express';
import { FinancialInstitutionsController } from './financial-institutions.controller';

const router = express.Router();

router.get('/', FinancialInstitutionsController.getAll);

export const financialInstitutionsRouter = router;
