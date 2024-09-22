"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtHelper_1 = require("../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config/config"));
const HTTPError_1 = require("../errors/HTTPError");
const http_status_1 = __importDefault(require("http-status"));
const authGuard = (...roles) => {
    return (req, _res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new HTTPError_1.HTTPError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        try {
            const verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new HTTPError_1.HTTPError(http_status_1.default.UNAUTHORIZED, "You don't have the permission");
            }
            req.user = verifiedUser;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = authGuard;
