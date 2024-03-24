import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.dir('came to global error handler');
   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.name || 'Something went wrong',
      error: err.message,
   });
};

export default globalErrorHandler;
