import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';
import { paginationParams, validParams } from './user.constant';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response) => {
   const result = await userService.createUser(req.body);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User Created Successfully!',
      data: result,
   });
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
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
      throw new Error('generated error');
      const result = await userService.getUsersFromDB(
         validQueryParams,
         paginationQueryParams,
         sortingQueryParams
      );

      sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'User Fetched Successfully!',
         meta: result.meta,
         data: result.result,
      });
   } catch (error) {
      next(error);
   }
};

const getSingleUser = async (req: Request, res: Response) => {
   const result = await userService.getSingleUserFromDB(req.params.userId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
   });
};

const updateUser = async (req: Request, res: Response) => {
   const { userId } = req.params;

   try {
      const result = await userService.updateUserIntoDB(userId, req.body);

      sendResponse(res, {
         statusCode: httpStatus.OK,
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

      sendResponse(res, {
         statusCode: httpStatus.OK,
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

      sendResponse(res, {
         statusCode: 200,
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
