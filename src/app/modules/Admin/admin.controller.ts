import { Request, Response } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import catchAsync from '../../../shared/catchAsync';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';
import { validParams } from './admin.constants';
import { paginationAndSortingParams } from '../../../shared/appConstants';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, validParams);
   const paginationAndSortingQueryParams = filterValidQueryParams(
      req.query,
      paginationAndSortingParams
   );

   const result = await AdminService.getAllAdminFomDB(
      validQueryParams,
      paginationAndSortingQueryParams
   );

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin data fetched!',
      meta: result.meta,
      data: result.result,
   });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AdminService.getSingleAdminFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin data fetched successfully!',
      data: result,
   });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AdminService.updateAdminIntoDB(id, req.body);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin data updated successfully!',
      data: result,
   });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AdminService.deleteAdminFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin data deleted successfully!',
      data: result,
   });
});

const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AdminService.softDeleteAdminFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin data deleted!',
      data: result,
   });
});

export const AdminController = {
   getAllAdmin,
   getSingleAdmin,
   updateAdmin,
   deleteAdmin,
   softDeleteAdmin,
};
