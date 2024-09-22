"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.stack = stack;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.HTTPError = HTTPError;
