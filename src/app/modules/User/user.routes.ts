import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';
import { fileUploader } from '../../../helpers/fileUploader';

const router = express.Router();

router.post(
   '/',
   authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
   fileUploader.upload.single('file'),
   userController.createAdmin
);

export const userRoutes = router;
