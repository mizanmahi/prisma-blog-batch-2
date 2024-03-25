import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validationSchema';
import authGuard from '../../middlewares/authGuard';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authGuard, userController.getUsers);
router.get('/:userId', authGuard, userController.getSingleUser);
router.patch(
   '/:userId',
   validateRequest(userValidationSchema.userUpdateSchema),
   userController.updateUser
);
router.delete('/:userId', userController.deleteUser);
router.delete('/soft/:userId', userController.softDeleteUser);

export const userRoutes = router;
