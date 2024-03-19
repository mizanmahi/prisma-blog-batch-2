import { Request, Response } from 'express';
import { userService } from './user.service';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';
import { paginationParams, validParams } from './user.constant';

const createUser = async (req: Request, res: Response) => {
   const result = await userService.createUser(req.body);
   res.json({
      message: 'Ok',
      data: result,
   });
};
const getUsers = async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, validParams);
   const paginationQueryParams = filterValidQueryParams(
      req.query,
      paginationParams
   );
   const sortingQueryParams = filterValidQueryParams(req.query, [
      'sortBy',
      'sortOrder',
   ]);

   try {
      const result = await userService.getUsersFromDB(
         validQueryParams,
         paginationQueryParams,
         sortingQueryParams
      );
      res.json({
         success: true,
         data: result,
      });
   } catch (error) {
      console.log(error);
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
