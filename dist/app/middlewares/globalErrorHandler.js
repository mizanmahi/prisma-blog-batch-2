"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, _req, res, _next) => {
    console.dir('Came to global error handler');
    console.log(err.name);
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
    });
};
exports.default = globalErrorHandler;
