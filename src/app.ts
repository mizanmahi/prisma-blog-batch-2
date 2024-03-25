import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Oops! It looks like this page doesn't exist.",
      error: {
         path: req.originalUrl,
         error: `The requested URL was not found on this server.`,
         suggestion: 'Double-check the URL',
      },
   });
});

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

export default app;
