import { Request, Response } from 'express';
import { userService } from './user.service';

import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
   console.log(req.body);

   const result = await userService.createAdmin(req.body);
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
