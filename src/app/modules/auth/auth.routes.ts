import express from 'express';
import { authController } from './auth.controller';

const authRoutes = express.Router();

authRoutes.post('/login', authController.loginUser);
authRoutes.post('/refresh-token', authController.refreshToken);

export default authRoutes;
