import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../config/config';

const authGuard = (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.authorization;
   if (!token) {
      throw new Error('Unauthorized');
   }

   try {
      const verifiedUser = jwtHelpers.verifyToken(
         token,
         config.jwt.jwtSecret as Secret
      );
      next();
   } catch (error) {
      next(error);
   }
};

export default authGuard;
