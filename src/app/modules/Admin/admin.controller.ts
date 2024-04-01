import { Request, Response } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import catchAsync from '../../../shared/catchAsync';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';
import { paginationAndSortingParams, validParams } from './admin.constants';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, validParams);
   const paginationAndSortingQueryParams = filterValidQueryParams(
      req.query,
      paginationAndSortingParams
   );

   const result = await AdminService.getAllFromDB(
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

export const AdminController = {
   getAllFromDB,
};
