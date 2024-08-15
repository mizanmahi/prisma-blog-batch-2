import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
   return async (req: Request, _res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync(req);
         next();
      } catch (error) {
         next(error);
      }
   };
};
