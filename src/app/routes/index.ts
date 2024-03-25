import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import authRoutes from '../modules/auth/auth.routes';
import { blogRoutes } from '../modules/blog/blog.routes';

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
   {
      path: '/blog',
      route: blogRoutes,
   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
