import { z } from 'zod';

const createAdminSchema = z.object({
   password: z.string({ required_error: 'Password is required' }),
   admin: z.object({
      name: z.string({ required_error: 'Name is required' }),
      email: z.string({ required_error: 'Email is required' }),
      contactNumber: z.string({ required_error: 'Contact number is required' }),
   }),
});
const createAuthorSchema = z.object({
   password: z.string({ required_error: 'Password is required' }),
   author: z.object({
      name: z.string({ required_error: 'Name is required' }),
      email: z.string({ required_error: 'Email is required' }),
      contactNumber: z.string({ required_error: 'Contact number is required' }),
      gender: z.string({ required_error: 'Gender is required' }),
   }),
});

export const userValidationSchema = {
   createAdminSchema,
   createAuthorSchema,
};
