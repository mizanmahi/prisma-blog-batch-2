import { Admin, Prisma, User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prismaClient';

const createAdmin = async (data: any): Promise<Admin> => {
   const hashedPassword = await bcrypt.hash(data.password, 10);

   const userData = {
      email: data.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
   };

   const result = await prisma.$transaction(async (trClient) => {
      await trClient.user.create({
         data: userData,
      });
      return await trClient.admin.create({
         data: data.admin,
      });
   });

   return result;
};

export const userService = {
   createAdmin,
};
