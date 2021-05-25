import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.getAll);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export const usersRouter = router;
