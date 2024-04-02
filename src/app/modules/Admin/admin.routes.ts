import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admin.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { adminValidationSchemas } from './admin.ValidationSchema';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
   '/:id',
   validateRequest(adminValidationSchemas.update),
   AdminController.updateAdmin
);

router.delete('/:id', AdminController.deleteAdmin);

router.delete('/soft/:id', AdminController.softDeleteAdmin);

export const AdminRoutes = router;
