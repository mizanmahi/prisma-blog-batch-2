import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
   {
      path: '/user',
      route: userRoutes,
   },
   {
      path: '/admin',
      route: AdminRoutes,
   },
   {
      path: '/auth',
      route: authRoutes,
   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
