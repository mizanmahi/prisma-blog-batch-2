import express from 'express';
import { userController } from '../modules/User/user.controller';
import { userRoutes } from '../modules/User/user.routes';
import authRoutes from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
   {
      path: '/user',
      route: userRoutes,
   },
   {
      path: '/auth',
      route: authRoutes,
   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
