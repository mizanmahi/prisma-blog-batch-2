import { Server } from 'http';
import app from './app';

const PORT = 5000;
let server: Server;

async function main() {
   server = app.listen(PORT, () => {
      console.log(
         `🚀 Server ready at: http://localhost:${PORT} and the process id is ${process.pid}`
      );
   });
}

const exitHandler = () => {
   if (server) {
      server.close(() => {
         console.info('Server is shutting down');
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
};

const unexpectedErrorHandler = (error: unknown) => {
   console.log(error);
   exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

/* 
this will get fired upon stopping server by pressing ctrl + c
process.on('SIGINT', () => {
   console.log('SIGINT signal received');
   unexpectedErrorHandler('SIGINT signal received');
}); 
*/

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received');
   unexpectedErrorHandler('SIGTERM signal received');
});

main();
