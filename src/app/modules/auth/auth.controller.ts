import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { authServices } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
   const result = await authServices.loginUser(req.body);

   const { refreshToken } = result;

   res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
   });

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Logged in successfully!',
      data: {
         accessToken: result.accessToken,
         passwordChangeRequired: result.passwordChangeRequired,
      },
   });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
   const { refreshToken } = req.cookies;

   const result = await authServices.refreshToken(refreshToken);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token generated successfully!',
      data: result,
   });
});

export const authController = {
   loginUser,
   refreshToken,
};
