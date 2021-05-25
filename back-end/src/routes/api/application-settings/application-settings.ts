import express from 'express';
import { ApplicationSettingsController } from './application-settings.controller';

const router = express.Router();

router.get('/', ApplicationSettingsController.getAll);

export const applicationSettingsRouter = router;
