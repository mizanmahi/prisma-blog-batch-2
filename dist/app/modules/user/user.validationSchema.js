"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const createAdminSchema = zod_1.z.object({
    password: zod_1.z.string({ required_error: 'Password is required' }),
    admin: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        contactNumber: zod_1.z.string({ required_error: 'Contact number is required' }),
    }),
});
const createAuthorSchema = zod_1.z.object({
    password: zod_1.z.string({ required_error: 'Password is required' }),
    author: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        contactNumber: zod_1.z.string({ required_error: 'Contact number is required' }),
        gender: zod_1.z.string({ required_error: 'Gender is required' }),
    }),
});
exports.userValidationSchema = {
    createAdminSchema,
    createAuthorSchema,
};
