import { z } from 'zod';

const userUpdateSchema = z.object({
   body: z.object({
      username: z.string().optional(),
      email: z.string().optional(),
      isActive: z.boolean().optional(),
   }),
});

export const userValidationSchema = {
   userUpdateSchema,
};
