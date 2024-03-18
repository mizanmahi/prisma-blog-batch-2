import { Request, Response } from 'express';
import { userService } from './user.service';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';

const createUser = async (req: Request, res: Response) => {
   const result = await userService.createUser(req.body);
   res.json({
      message: 'Ok',
      data: result,
   });
};
const getUsers = async (req: Request, res: Response) => {
   const validParams = ['q', 'email'];
   const validQueryParams = filterValidQueryParams(req.query, validParams);

   try {
      const result = await userService.getUsersFromDB(validQueryParams);
      res.json({
         success: true,
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         data: error,
      });
   }
};

export const userController = {
   createUser,
   getUsers,
};
