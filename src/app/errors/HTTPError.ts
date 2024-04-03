export class HTTPError extends Error {
   statusCode: number;

   constructor(statusCode: number, message: string, stack = '') {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.stack = stack;

      if (stack) {
         this.stack = stack;
      } else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
}

function foo() {
   throw new HTTPError(4500, 'Error in foo function');
}

function bar() {
   foo();
}

try {
   bar();
} catch (error: any) {
   console.error(error.stack);
}
