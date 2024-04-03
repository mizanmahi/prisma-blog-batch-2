import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/', authGuard(UserRole.SUPER_ADMIN), userController.createAdmin);

export const userRoutes = router;
