import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmin);

router.get('/:id', AdminController.getSingleAdmin);

router.patch('/:id', AdminController.updateAdmin);

router.delete('/:id', AdminController.deleteAdmin);

// router.delete('/soft/:id', AdminController.softDeleteFromDB);

export const AdminRoutes = router;
