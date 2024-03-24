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
      res.status(200).json({
         success: true,
         message: 'Users fetched successfully',
         meta: result.meta,
         data: result.result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         data: error,
      });
   }
};

const getSingleUser = async (req: Request, res: Response) => {
   const result = await userService.getSingleUserFromDB(req.params.userId);
   res.json({
      success: true,
      message: 'User fetched successfully',
      data: result,
   });
};

const updateUser = async (req: Request, res: Response) => {
   const { userId } = req.params;

   try {
      const result = await userService.updateUserIntoDB(userId, req.body);

      res.json({
         success: true,
         message: 'User updated successfully',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         data: error,
      });
   }
};

const deleteUser = async (req: Request, res: Response) => {
   const { userId } = req.params;

   try {
      const result = await userService.deleteFromDB(userId);

      res.json({
         success: true,
         message: 'User deleted successfully',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         data: error,
      });
   }
};

const softDeleteUser = async (req: Request, res: Response) => {
   const { userId } = req.params;

   try {
      const result = await userService.softDeleteFromDB(userId);

      res.json({
         success: true,
         message: 'User deleted successfully',
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
   getSingleUser,
   updateUser,
   deleteUser,
   softDeleteUser,
};
