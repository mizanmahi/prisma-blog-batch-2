import express from 'express';
import { blogController } from './blog.controller';
import authGuard from '../../middlewares/authGuard';

const router = express.Router();

router.post('/', authGuard, blogController.createBlog);

export const blogRoutes = router;
