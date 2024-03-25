import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authService } from './auth.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req: Request, res: Response) => {
   const result = await authService.loginUser(req.body);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in Successfully!',
      data: result,
   });
});

export const authController = {
   loginUser,
};
