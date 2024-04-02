import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validationSchema';
import authGuard from '../../middlewares/authGuard';

const router = express.Router();

router.post('/', userController.createAdmin);

export const userRoutes = router;
