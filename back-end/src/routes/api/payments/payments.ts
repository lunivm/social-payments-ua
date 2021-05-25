import express from 'express';
import { PaymentsController } from './payments.controller';

const router = express.Router();

router.get('/', PaymentsController.getByFilter);
router.post('/', PaymentsController.create);
router.patch('/', PaymentsController.groupUpdate);
router.get('/latest', PaymentsController.getLatest);
router.get('/:id', PaymentsController.getPayment);
router.patch('/:id', PaymentsController.update);
router.delete('/:id', PaymentsController.deletePayment);

export const paymentsRouter = router;
