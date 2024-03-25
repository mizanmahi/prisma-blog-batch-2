import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';
import { paginationParams, validParams } from './user.constant';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
   const result = await userService.createUser(req.body);
   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User Created Successfully!',
      data: result,
   });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, validParams);
   const paginationQueryParams = filterValidQueryParams(
      req.query,
      paginationParams
   );
   const sortingQueryParams = filterValidQueryParams(req.query, [
      'sortBy',
      'sortOrder',
   ]);

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
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
   const result = await userService.getSingleUserFromDB(req.params.userId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
   });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;

   const result = await userService.updateUserIntoDB(userId, req.body);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
   });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;

   const result = await userService.deleteFromDB(userId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
   });
});

const softDeleteUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;
   const result = await userService.softDeleteFromDB(userId);

   sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User deleted successfully',
      data: result,
   });
});

export const userController = {
   createUser,
   getUsers,
   getSingleUser,
   updateUser,
   deleteUser,
   softDeleteUser,
};
