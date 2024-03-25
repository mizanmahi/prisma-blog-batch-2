import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { blogService } from './blog.service';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createBlog = catchAsync(
   async (req: Request & { user?: any }, res: Response) => {
      const user = req.user;

      const result = await blogService.createBlog(req.body, user);
      sendResponse(res, {
         statusCode: httpStatus.CREATED,
         success: true,
         message: 'Blog Created Successfully!',
         data: result,
      });
   }
);

export const blogController = {
   createBlog,
};
