import express, { Request, Response, NextFunction } from 'express';
import { userController } from './user.controller';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';
import { fileUploader } from '../../../helpers/fileUploader';
import { userValidationSchema } from './user.validationSchema';

const router = express.Router();

router.post(
   '/',
   authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
   fileUploader.upload.single('file'),
   (req: Request, res: Response, next: NextFunction) => {
      req.body = userValidationSchema.createAdminSchema.parse(
         JSON.parse(req.body.data)
      );

      return userController.createAdmin(req, res, next);
   }
);

export const userRoutes = router;
