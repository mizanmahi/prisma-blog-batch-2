import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
   err: any,
   _req: Request,
   res: Response,
   _next: NextFunction
) => {
   console.dir('Came to global error handler');
   console.log(err.name);
   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
   });
};

export default globalErrorHandler;
