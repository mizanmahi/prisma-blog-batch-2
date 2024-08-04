import { Request, Response } from 'express';

import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { userService } from './user.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
   const result = await userService.createAdmin(req);
   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admin Created Successfully!',
      data: result,
   });
});

export const userController = {
   createAdmin,
};
